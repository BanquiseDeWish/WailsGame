export const NOT_SVG_COSMETICS = ['penguin_color', 'icon_background', 'slogan', 'card_background'];
const DARK_MAIN_COLOR = "#2C384F";
const MAIN_COLOR = "#3E526B";
const LIGHT_MAIN_COLOR = "#546B88";

export function formatStyle(cosmetic) {
    let x = cosmetic?.data?.x ?? 0;
    let y = cosmetic?.data?.y ?? 0;
    let scale = cosmetic?.data?.scale ?? 1;
    let rotation = cosmetic?.data?.rotation ?? 0;
    let pivotX = x + cosmetic?.data?.width * scale / 2;
    let pivotY = y + cosmetic?.data?.height * scale / 2;
    let flipHorizontally = cosmetic?.data?.flipHorizontally ?? false;
    let flipVertically = cosmetic?.data?.flipVertically ?? false;
    if (!NOT_SVG_COSMETICS.includes(cosmetic.sub_type))
        cosmetic.style.forEach((style, _) => {
            //style.style = style.style.replace(/fill="#[0-9A-F]{6}"/g, `fill="${cosmetic?.data?.colors?.main_color ?? MAIN_COLOR}"`);
            style.style = <g transform={`rotate(${rotation} ${pivotX} ${pivotY}) translate(${x} ${y}) scale(${scale}) ${flipHorizontally ? 'scale(-1, 1)' : ''}`} dangerouslySetInnerHTML={{ __html: style.style }} />
        });
}

export function formatStyleMany(cosmetics) {
    cosmetics.forEach((cosmetic, _) => {
        formatStyle(cosmetic);
    });
}

export function copyAndFormatStyle(cosmetic) {
    let cosm = { ...cosmetic };
    cosm.style = [];
    cosmetic.style.forEach((style, _) => {
        cosm.style.push({ ...style }); 
    });
    formatStyle(cosm);
    return cosm;
}

export function copyAndFormatStyleMany(cosmetics) {
    let cosmeticsList = [];
    cosmetics.forEach((cosmetic, _) => {
        cosmeticsList.push(copyAndFormatStyle(cosmetic));
    });
    return cosmeticsList;
}

export function getDefaultColors() {
    return {
        style: {
            main_color: MAIN_COLOR,
            dark_main_color: DARK_MAIN_COLOR,
            light_main_color: LIGHT_MAIN_COLOR
        }
    };
}

export function getDefaultCosmetics() {
    return {
        // Penguin
        penguin: {
            hat_front: undefined,
            hat_back: undefined,
            beak: undefined,
            eye: undefined,
            tail: undefined,
            backpack: undefined,
            body_front: undefined,
            body_back: undefined,
            left_arm: undefined,
            left_forearm: undefined,
            right_arm: undefined,
            right_forearm: undefined,
            left_foot: undefined,
            right_foot: undefined,
            pet: undefined,
            color: getDefaultColors(),
        },
        // Card
        card: {
            card_background: undefined,
            icon_background: undefined,
            slogan: { name: 'Un Pingouin Voyageur' },
        }
    };
}

export function getDefaultValueFor(type, part) {
    return getDefaultCosmetics()[type][part];
}

export function formatCosmetics(cosmeticsList) {
    let cosmetics = getDefaultCosmetics();

    cosmeticsList.forEach((cosmetic, _) => {
        if (cosmetic.type == 'penguin') {
            if(cosmetic.sub_type == 'penguin_color')
                cosmetics.penguin.color = { id: cosmetic.id, style: cosmetic.data.colors };
            else
                cosmetic?.style?.forEach((style, _) => {
                    if(!style.part_name) return;
                    cosmetics.penguin[style?.part_name] = {id: cosmetic.id, style: style?.style};
                });
        }
        else if (cosmetic.type == 'card') {
            cosmetic?.style?.forEach((style, _) => {
                if(!style.part_name) return;
                cosmetics.card[style?.part_name] = {id: cosmetic.id, style: style?.style};
            });
        }
    });
    return cosmetics;
}

