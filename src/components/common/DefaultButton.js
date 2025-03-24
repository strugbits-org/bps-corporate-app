import DelayedLink from "./DelayedLink";

export const DefaultButton = ({ data, customClasses = "", attributes, showArrow = true }) => {

    let actionType;
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    if (data && data.action) {
        const urlString = data.action;
        if (isValidUrl(urlString)) {
            actionType = "external_link";
        } else if (urlString.startsWith("/")) {
            actionType = "internal_link";
        } else {
            actionType = "modal";
        };
    };

    return actionType === "modal" ? (
        <btn-modal-open
            group={data.action}
            class={customClasses ? customClasses : 'btn-blue'}
            data-cursor-style="off"
            {...attributes}
        >
            <span>{data.label}</span>
            {showArrow && <i className="icon-arrow-right-2"></i>}
        </btn-modal-open>
    ) : (
        <DelayedLink to={data.action} target={actionType === "external_link" ? "_blank" : undefined} className={customClasses ? customClasses : 'btn-blue'} attributes={{ ...attributes, "data-cursor-style": 'off' }}>
            <span>{data.label}</span>
            {showArrow && <i className="icon-arrow-right-2"></i>}
        </DelayedLink>
    )
}
