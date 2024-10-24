import parse from 'html-react-parser';

const isDebugMode = process.env.DEBUG_LOGS === "1";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

export const filterSearchData = (collection, selectedStudios, selectedMarkets) => {
  let data = collection;
  if (selectedStudios.length > 0 && selectedMarkets.length > 0) {
    data = data.filter(item =>
      item.studios.some(studio => selectedStudios.includes(studio._id)) ||
      item.markets.some(market => selectedMarkets.includes(market._id))
    );
  } else if (selectedStudios.length > 0) {
    data = data.filter(item =>
      item.studios.some(studio => selectedStudios.includes(studio._id))
    );
  } else if (selectedMarkets.length > 0) {
    data = data.filter(item =>
      item.markets.some(market => selectedMarkets.includes(market._id))
    );
  }
  return data;
}

export const convertToHTML = ({ content = "", class_p = "", class_ul = "", data_aos_p = "" }) => {
  if (typeof content === 'string') return content;
  let html = "";

  content.nodes.forEach(node => {
    if (node.type === 'PARAGRAPH') {
      if (node.nodes.length > 0) {
        html += `<p className="${class_p}" data-aos="${data_aos_p}">`;

        node.nodes.forEach(textNode => {
          if (textNode.type === 'TEXT') {
            let decorationsHTML = "";

            if (textNode.textData.decorations) {
              textNode.textData.decorations.forEach(decoration => {
                if (decoration.type === 'BOLD') {
                  decorationsHTML += '<strong>';
                } else if (decoration.type === 'ITALIC') {
                  decorationsHTML += '<em>';
                }
              });
            }

            html += decorationsHTML + textNode.textData.text;

            if (decorationsHTML !== "") {
              decorationsHTML.split('').reverse().forEach(char => {
                if (char === '>') {
                  html += '</' + decorationsHTML.substring(decorationsHTML.lastIndexOf('<') + 1);
                  decorationsHTML = decorationsHTML.substring(0, decorationsHTML.lastIndexOf('<'));
                }
              });
            }
          }
        });

        html += '</p>';
      } else {
        html += '<br/>';
      }
    } else if (node.type === 'BULLETED_LIST') {
      html += `<ul className="${class_ul}" >`;

      node.nodes.forEach(listItem => {
        html += '<li>';

        listItem.nodes.forEach(paragraph => {
          paragraph.nodes.forEach(textNode => {
            if (textNode.type === 'TEXT') {
              let decorationsHTML = "";

              if (textNode.textData.decorations) {
                textNode.textData.decorations.forEach(decoration => {
                  if (decoration.type === 'BOLD') {
                    decorationsHTML += '<strong>';
                  } else if (decoration.type === 'ITALIC') {
                    decorationsHTML += '<em>';
                  }
                });
              }

              html += decorationsHTML + textNode.textData.text;

              if (decorationsHTML !== "") {
                decorationsHTML.split('').reverse().forEach(char => {
                  if (char === '>') {
                    html += '</' + decorationsHTML.substring(decorationsHTML.lastIndexOf('<') + 1);
                    decorationsHTML = decorationsHTML.substring(0, decorationsHTML.lastIndexOf('<'));
                  }
                });
              }
            }
          });
        });

        html += '</li>';
      });

      html += '</ul>';
    }
  });

  return parse(html);
}

export const closeModals = () => {
  if (typeof window !== 'undefined') {
    const submenu = document.querySelector('.submenu');
    if (submenu) submenu.classList.remove('active');

    const modal_group = document.querySelectorAll("modal-group");
    if (modal_group) modal_group.forEach(modal => {
      if (modal.classList.contains("active")) {
        modal.close();
      }
    });

    const wrapperCursor = document.querySelector('#wrapper-cursor');
    if (wrapperCursor) wrapperCursor.click();

    const active_accordion = document.querySelector(".accordion-item.active");
    if (active_accordion) active_accordion.removeActive({});

    const body = document.body;
    if (body.classList.contains('menu-active')) body.classList.remove('menu-active');

    const chatIsActive = document.querySelector(".chat")?.classList?.contains("active");
    if (chatIsActive) document.querySelector(".chat")?.classList?.remove("active");

    document.querySelectorAll(".player-video").forEach((x) => {
      x.pause();
      setTimeout(() => {
        x.currentTime = 0;
      }, 500);
    });

  }
}

export const changeProgress = (percent) => {
  if (typeof window !== 'undefined') {
    document.body.style.setProperty("--percentage", percent / 100);
    document.body.style.setProperty("--percentage2", `${percent}%`);
    const elProg = document.querySelector('[data-load-progress]');
    if (elProg) elProg.dataset.loadProgress = percent;
  }
}

export const enableChat = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const customEvent = new Event("enableChat");
      const chat = document.querySelector(".activateChat");
      if (chat) chat.dispatchEvent(customEvent);
    }, 200);
  }
};

export const initAnimations = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      document.querySelector(".initScript").click();
    }, 200);
  }
};

export const updatedWatched = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const customEvent = new Event("customUpdateWatch");
      const elem = document.querySelector(".updateWatchedTrigger");
      if (elem) elem.dispatchEvent(customEvent);
    }, 200);
  }
};

export const loadPinterest = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const script = document.createElement("script");
      script.async = true;
      script.type = "text/javascript";
      script.dataset.pinBuild = "doBuild";
      script.src = "//assets.pinterest.com/js/pinit.js";
      document.body.appendChild(script);
      if (window.doBuild) window.doBuild();
    }, 1000);
  }
};

export const refreshMagazineIframe = () => {
  if (typeof window !== 'undefined') {
    const container = document.querySelector('#trendMagazine:not(.iframe-loaded)');
    const iframe = document.querySelector('#trendMagazine:not(.iframe-loaded) iframe');
    if (iframe) {
      iframe.src = iframe.src;
      container.classList.add("iframe-loaded");
    }
  }
}

export const markPageLoaded = (watched = true) => {
  if (typeof window !== 'undefined') {
    closeModals();
    setTimeout(() => window.scrollTo({ top: 0 }), 200);
    initAnimations();
    if (watched) updatedWatched();
    setTimeout(loadPinterest, 1000);
    const isFirstLoadDone = document.body.classList.contains("first-load-done");
    if (isFirstLoadDone) {
      pageLoadEnd();
    } else {
      firstLoadAnimation();
    }
  }
}

export const firstLoadAnimation = async () => {
  for (let i = 0; i <= 100; i++) {
    await new Promise(resolve => setTimeout(resolve, 1));
    if (i === 25 || i === 50 || i === 75 || i === 100) {
      changeProgress(i);
    }
  }
  document.body.dataset.load = "first-leaving";
  setTimeout(() => {
    document.body.dataset.load = "first-done";
  }, 1200);
  document.body.classList.add("first-load-done");
}

export const pageLoadStart = () => {
  if (typeof window !== 'undefined') {
    closeModals();
    document.body.classList.add("page-leave-active");

    setTimeout(() => {
      const scrollContainer = document.querySelector("[data-scroll-container]");
      window.scrollTo({ top: 0, behavior: "auto" });
      if (scrollContainer) scrollContainer.classList.add("wrapper-no-transform");
    }, 500);
  }
}

export const pageLoadEnd = () => {
  if (window && typeof window !== 'undefined') {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer && scrollContainer.classList.contains("wrapper-no-transform")) scrollContainer.classList.remove("wrapper-no-transform");

    window.scrollTo({ top: 0 });
    const body = document.body;
    body.classList.replace("page-leave-active", "page-enter-active");
    setTimeout(() => {
      body.classList.remove("page-enter-active");
    }, 900);
  }
}

export const renderNode = (node) => {

  const HeadingComponent = ({ level, children }) => {
    const HeadingTag = `h${level}`;
    return <HeadingTag>{children}</HeadingTag>;
  };

  const renderTextWithDecorations = (textData) => {
    if (!textData.decorations || textData.decorations.length === 0) {
      return textData.text;
    }

    return textData.decorations.reduce((acc, decoration) => {
      switch (decoration.type) {
        case "ITALIC":
          return <i>{acc}</i>;
        case "BOLD":
          return <b>{acc}</b>;
        case "LINK":
          return (
            <a
              href={decoration.linkData.link.url}
              target="_blank"
              rel="noreferrer"
            >
              {acc}
            </a>
          );
        default:
          return acc;
      }
    }, textData.text);
  };

  switch (node.type) {
    case "HEADING":
      const headingClass = `fs--${30 + node.headingData.level * 2
        } text-center text-uppercase white-1 split-chars`;
      return (
        <HeadingComponent
          level={node.headingData.level}
          className={headingClass}
        >
          {renderTextWithDecorations(node.nodes[0].textData)}
        </HeadingComponent>
      );
    case "PARAGRAPH":
      return (
        <p>
          {node.nodes.map((n, idx) => (
            <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
          ))}
        </p>
      );
    case "ORDERED_LIST":
      return (
        <ol>
          {node.nodes.map((listItem) => (
            <li key={listItem.id}>
              {listItem.nodes[0].nodes.map((n, idx) => (
                <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
              ))}
            </li>
          ))}
        </ol>
      );
    case "BULLETED_LIST":
      return (
        <ul>
          {node.nodes.map((listItem) => (
            <li key={listItem.id}>
              {listItem.nodes[0].nodes.map((n, idx) => (
                <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
              ))}
            </li>
          ))}
        </ul>
      );
    case "DIVIDER":
      return <hr />;
    default:
      return null;
  }
};

export const logError = (...args) => {
  if (isDebugMode) console.error(...args);
};

export const deletePriceFields = (obj) => {
  if (!obj) return;

  const deleteIfExists = (field) => {
    if (obj.hasOwnProperty(field)) {
      delete obj[field];
    }
  };

  const fieldsToDelete = [
    'currency',
    'formattedDiscountedPrice',
    'pricePerUnitData',
    'pricePerUnit',
    'formattedPricePerUnit',
    'formattedPrice',
    'price',
    'discountedPrice',
  ];

  fieldsToDelete.forEach(deleteIfExists);
};
