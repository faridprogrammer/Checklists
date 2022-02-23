import tags from "./data/json/tags.json"
import * as croma from "chroma-js"

const isBrowser = typeof window !== "undefined"

const globals = {

    getTagColor: function (tag) {
        return (tags[tag] && tags[tag].color) || "silver";
    },

    truncate: function (input, length) {
        length = length || 30;
        if (input.length > length) {
            return input.substring(0, length) + '...';
        }
        return input;
    },
    resetBackgroundColor: function () {
        let backGroundColor = [255, 255, 255];
        if (isBrowser) {
            document.body.style.background = croma(backGroundColor);
        }
    }
};


export default globals