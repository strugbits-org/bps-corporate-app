import { DefaultButton } from "./DefaultButton";

const StudiosFixedMenu = ({ data }) => {
  return (
    <div className="category-menu-fixed">
      <div className="category-menu-wrapper">
        <div className="category-menu">
          <ul className="category-menu-list">
            {data.map((data, index) => {
              const { slug, cardName, link } = data;

              return (
                <li key={index}>
                  <DefaultButton
                    data={{ label: cardName, action: link }}
                    customClasses={"btn-underline-white"}
                    showArrow={false}
                  >
                  </DefaultButton>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="btn-close-category-menu" data-category-menu-close>
          <i className="icon-plus"></i>
        </button>
      </div>
    </div >
  );
};

export default StudiosFixedMenu;
