import DelayedLink from "./DelayedLink";

const StudiosFixedMenu = ({ data }) => {
  return (
    <div className="category-menu-fixed">
      <div className="category-menu-wrapper">
        <div className="category-menu">
          <ul className="category-menu-list">
            {data.map((data, index) => {
              const { slug, cardName } = data;

              return (
                <li key={index}>
                  <DelayedLink
                    to={`/services/${slug}`}
                    className="btn-underline-white">
                    <span>{cardName}</span>
                  </DelayedLink>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="btn-close-category-menu" data-category-menu-close>
          <i className="icon-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default StudiosFixedMenu;
