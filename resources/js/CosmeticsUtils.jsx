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
        cosmetic.style = <g transform={`rotate(${rotation} ${pivotX} ${pivotY}) translate(${x} ${y}) scale(${scale}) ${flipHorizontally ? 'scale(-1, 1)' : ''}`} dangerouslySetInnerHTML={{ __html: cosmetic.style }} />
}

export function formatStyleMany(cosmetics) {
    cosmetics.forEach((cosmetic, _) => {
        formatStyle(cosmetic);
    });
}

export function copyAndFormatStyle(cosmetic) {
    let cosm = { ...cosmetic };
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
            penguin_hat: undefined,
            penguin_eye: undefined,
            penguin_backpack: undefined,
            penguin_color: getDefaultColors(),
            penguin_accessory: undefined,
            penguin_beak: undefined,
            penguin_tail: undefined,
        },
        // Card
        card: {
            card_background: undefined,
            icon_background: undefined,
            slogan: { name: 'Un Pingouin Voyageur' },
        }
    };
}

export function getDefaultValueFor(type, sub_type) {
    return getDefaultCosmetics()[type][sub_type];
}

export function formatCosmetics(cosmeticsList) {
    let cosmetics = getDefaultCosmetics();

    cosmeticsList.forEach((cosmetic, _) => {
        if (cosmetic.type == 'penguin') {
            switch (cosmetic.sub_type) {
                case 'penguin_hat':
                    cosmetics.penguin.penguin_hat = cosmetic;
                    break;
                case 'penguin_eye':
                    cosmetics.penguin.penguin_eye = cosmetic;
                    break;
                case 'penguin_backpack':
                    cosmetics.penguin.penguin_backpack = cosmetic;
                    break;
                case 'penguin_color':
                    cosmetics.penguin.penguin_color = { id: cosmetic.id, style: cosmetic.data.colors };
                    break;
                case 'penguin_accessory':
                    cosmetics.penguin.penguin_accessory = cosmetic;
                    break;
                case 'penguin_beak':
                    cosmetics.penguin.penguin_beak = cosmetic;
                    break;
                case 'penguin_tail':
                    cosmetics.penguin.penguin_tail = cosmetic;
                    break;
            }
        }
        else if (cosmetic.type == 'card') {
            switch (cosmetic.sub_type) {
                case 'card_background':
                    cosmetics.card.card_background = cosmetic;
                    break;
                case 'icon_background':
                    cosmetics.card.icon_background = cosmetic;
                    break;
                case 'slogan':
                    cosmetics.card.slogan = cosmetic;
                    break;
            }
        }
    });
    return cosmetics;
}

