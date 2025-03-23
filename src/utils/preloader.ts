import { Assets } from "pixi.js";

const assetList = [
    {name: "planet01", src: "/assets/planet01.png"},
    {name: "planet02", src: "/assets/planet02.png"},
    {name: "planet03", src: "/assets/planet03.png"},
    {name: "planet04", src: "/assets/planet04.png"},
    {name: "planet05", src: "/assets/planet05.png"},
    {name: "planet06", src: "/assets/planet06.png"},
    {name: "planet07", src: "/assets/planet07.png"},
    {name: "planet08", src: "/assets/planet08.png"},
    {name: "planet09", src: "/assets/planet09.png"},
    {name: "background", src: "/assets/space-stars.jpg"},
    
    // {name: "sorry", src: "/assets/sorry.mp3"},
    // {name: "engage", src: "/assets/engage.mp3"},
    // {name: "theme", src: "/assets/theme.mp3"},
    // {name: "warp", src: "/assets/warp.mp3"},
    // {name: "force", src: "/assets/force.mp3"},
    
];

export const loadAssets = async () => {
    assetList.forEach(asset => {
        Assets.add(asset.name, asset.src);
    });

    try {
        const resources = await Assets.load(assetList.map(asset => asset.name));
        console.log("Assets loaded");
        return resources;
    } catch (error) {
        console.error("Error loading", error);
        throw error;
    };
}