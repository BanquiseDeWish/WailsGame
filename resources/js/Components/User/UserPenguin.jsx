import { useEffect, useState } from 'react';

import { useValues } from '@/AppContext';
import { randomId } from '@/Game/random';

const viewBoxWidth = 700;
const viewBoxHeight = 950;

const DARK_MAIN_COLOR = "#2C384F";
const MAIN_COLOR = "#3E526B";
const LIGHT_MAIN_COLOR = "#546B88";
const COLOR4 = "#AAC5CF";
const COLOR5 = "#CBDDE2";
const COLOR6 = "#EFF5F6";
const COLOR7 = "#A26251";
const COLOR8 = "#D89374";


export default function UserPenguin({ className, propsCosmetics, twitchId, width = 256, ...props }) {

    const values = useValues();
    const [cosmetics, setCosmetics] = useState(propsCosmetics ?? values.getCosmetics(twitchId));
    const [penguinColors, setPenguinColors] = useState(propsCosmetics ? getPenguinColor(propsCosmetics) : getPenguinColor(values.getCosmetics(twitchId)));
    const [penguinEyes, setPenguinEyes] = useState(propsCosmetics ? getCosmeticWithPosition(propsCosmetics, 'penguin_eye', getDefaultEye()) : getCosmeticWithPosition(values.getCosmetics(twitchId), 'penguin_eye', getDefaultEye()));
    const [penguinBeak, setPenguinBeak] = useState(propsCosmetics ? getCosmeticWithPosition(propsCosmetics, 'penguin_beak', getDefaultBeak()) : getCosmeticWithPosition(values.getCosmetics(twitchId), 'penguin_beak', getDefaultBeak()));

    useEffect(() => {
        if (twitchId) {
            let cosmetics = values.getCosmetics(twitchId);
            if (cosmetics) {
                setCosmetics(cosmetics);
                setData(cosmetics);
            }
        }
        else if(!propsCosmetics) {
            clearData();
        }
    }, [twitchId, values.update])

    useEffect(() => {
        if(!twitchId)
            clearData();
        if(propsCosmetics?.length > 0) {
            setCosmetics(propsCosmetics);
            setData(propsCosmetics);
        }
    }, [propsCosmetics]);

    function getDefaultEye() {
        return {
            name: 'default',
            style: `<g id="eye">
                        <path id="Vector_11" d="M288.77 27.6313C288.338 46.3919 291.648 68.8273 304.255 83.4833C308.6 87.9707 312.609 91.3304 319.033 91.6313C322.98 91.5842 325.139 90.7372 328.097 88.1436C331.959 84.1284 334.743 79.7328 336.966 74.6247C337.432 73.5695 337.432 73.5695 337.907 72.4929C339.184 67.0322 339.204 61.9018 336.366 56.9726C330.887 49.131 322.062 45.5862 313.566 42.0938C306.665 39.253 292.765 30.8921 288.77 27.6313Z" fill="#FAFAFB" />
                        <g id="pupil">
                            <circle id="Ellipse 8" cx="319.765" cy="68.3921" r="10" fill="#354357" />
                            <circle id="Ellipse 9" cx="323.265" cy="63.8921" r="3" fill="#EAEEF0" />
                        </g>
                    </g>`,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            pivotX: 0,
            pivotY: 0
        }
    }

    function getDefaultBeak() {
        return {
            name: 'default',
            style: `<g id="beak">
                        <g id="bottom_beak">
                            <path id="front_bottom_beak" d="M465.5 88C452.379 102.512 427.51 106.409 411 116.5C408.075 117.652 406.762 117.429 403.809 116.363C387.446 104.549 371.521 92.3842 356.733 78.6313C356.219 78.153 356.39 76.6313 356.733 76.6313C389 80 429.5 84.5 465.5 88Z" fill="#C07359" />
                            <path id="line_bottom_beak" d="M409.5 73.5L465.5 88L357.5 77L409.5 73.5Z" fill="#93543F" />
                            <path id="back_bottom_beak" d="M465.733 87.65C465.403 88.31 465.06 88.5 464.56 89C433.112 86.4158 401.844 82.0033 370.407 79.2777C368.101 79.0721 356.733 79.1413 356.733 76.6311C390.5 75.5 428 83 465.733 87.65Z" fill="#6E5D59" />
                        </g>
                        <g id="top_beak">
                            <path id="Vector_9" d="M402.47 52.3921C407.47 53.8921 411.314 55.7141 415.81 57.5092C417.017 57.991 418.224 58.4729 419.468 58.9693C423.32 60.6783 426.681 62.9116 430.168 65.2311C433.369 67.2858 436.652 69.1834 439.966 71.0596C440.582 71.4094 441.198 71.7592 441.833 72.1196C444.386 73.567 446.942 75.0105 449.501 76.4474C451.395 77.5127 453.285 78.5858 455.174 79.66C456.288 80.2877 457.402 80.9153 458.55 81.5619C461.34 83.336 463.484 85.2736 465.733 87.65C438 86.5 411.587 67.7579 387.233 65.1313C387.233 62.0506 392.733 60.8467 394.816 58.7487C395.7 58.022 396.584 57.2952 397.494 56.5465C398.378 55.8118 399.262 55.0771 400.172 54.3201C400.86 53.7628 401.762 52.9663 402.47 52.3921Z" fill="#DEA084" />
                            <path id="Vector_10" d="M397.546 62.8812C413.907 67.7069 427.281 77.5074 444.608 83.2562C445.983 83.7145 457.625 86.5917 459 87.05C427.5 83.2562 388 78 372.733 76.6312C372.733 72.8299 378.17 72.2789 380.733 69.6313C389.413 61.234 390.428 61.6001 397.546 62.8812Z" fill="#CD8061" />
                        </g>
                    </g>`,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            pivotX: 0,
            pivotY: 0
        };
    }

    function getDefaultColors() {
        return {main_color: MAIN_COLOR, dark_main_color: DARK_MAIN_COLOR, light_main_color: LIGHT_MAIN_COLOR};
    }

    function getPenguinColor(cosmetics) {
        const cosmetic = cosmetics?.find(cosmetic => cosmetic.type == 'penguin' && cosmetic.sub_type == 'penguin_color');
        if (cosmetic) {
            return cosmetic.data.colors;
        }
        return getDefaultColors();
    }

    function getCosmeticWithPosition(cosmetics, sub_type, defaultValue) {
        return cosmetics?.find(cosmetic => {
            if (cosmetic.type == 'penguin' && cosmetic.sub_type == sub_type) {
                cosmetic.x = cosmetic?.data?.x ?? 0;
                cosmetic.y = cosmetic?.data?.y ?? 0;
                cosmetic.scale = cosmetic?.data?.scale ?? 1;
                cosmetic.rotation = cosmetic?.data?.rotation ?? 0;
                cosmetic.pivotX = cosmetic.x + cosmetic?.data?.width * cosmetic.scale / 2;
                cosmetic.pivotY = cosmetic.y + cosmetic?.data?.height * cosmetic.scale / 2;
                return cosmetic;
            }
        }) ?? defaultValue;
    }

    function setData(cosmetics) {
        let penguinColors = false;
        let penguinEyes = false;
        let penguinBeak = false;
        cosmetics?.forEach(cosmetic => {
            if (cosmetic.type == 'penguin' && cosmetic.sub_type == 'penguin_color') {
                setPenguinColors(cosmetic.data.colors);
                penguinColors = true;
                return;
            }
            else if(cosmetic.type == 'penguin' && cosmetic.sub_type == 'penguin_beak') {
                cosmetic.x = cosmetic?.data?.x ?? 0;
                cosmetic.y = cosmetic?.data?.y ?? 0;
                cosmetic.scale = cosmetic?.data?.scale ?? 1;
                cosmetic.rotation = cosmetic?.data?.rotation ?? 0;
                cosmetic.pivotX = cosmetic.x + cosmetic?.data?.width * cosmetic.scale / 2;
                cosmetic.pivotY = cosmetic.y + cosmetic?.data?.height * cosmetic.scale / 2;
                setPenguinBeak(cosmetic);
                penguinBeak = true;
                return;
            }
            else if (cosmetic.type == 'penguin' && cosmetic.sub_type == 'penguin_eye') {
                cosmetic.x = cosmetic?.data?.x ?? 0;
                cosmetic.y = cosmetic?.data?.y ?? 0;
                cosmetic.scale = cosmetic?.data?.scale ?? 1;
                cosmetic.rotation = cosmetic?.data?.rotation ?? 0;
                cosmetic.pivotX = cosmetic.x + cosmetic?.data?.width * cosmetic.scale / 2;
                cosmetic.pivotY = cosmetic.y + cosmetic?.data?.height * cosmetic.scale / 2;
                setPenguinEyes(cosmetic);
                penguinEyes = true;
                return;
            }
        });
        if(!penguinColors) setPenguinColors(getDefaultColors());
        if(!penguinEyes) setPenguinEyes(getDefaultEye());
        if(!penguinBeak) setPenguinBeak(getDefaultBeak());
    }

    function clearData() {
        setPenguinColors(getDefaultColors());
        setPenguinEyes(getDefaultEye());
        setPenguinBeak(getDefaultBeak());
        setCosmetics([]);
    }

    return (
        <svg
            className={className}
            width={width}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {
                cosmetics?.map((cosmetic, _) => {
                    if (!cosmetic || cosmetic.type != 'penguin' || cosmetic?.data?.position != 'back') return;
                    if (!['hat', 'backpack', 'accessory'].includes(cosmetic.sub_type)) return;
                    let x = cosmetic?.data?.x ?? 0;
                    let y = cosmetic?.data?.y ?? 0;
                    let scale = cosmetic?.data?.scale ?? 1;
                    let rotation = cosmetic?.data?.rotation ?? 0;
                    let pivotX = x + cosmetic?.data?.width * scale / 2;
                    let pivotY = y + cosmetic?.data?.height * scale / 2;

                    return (
                        <svg key={cosmetic?.name}>
                            <g transform={`rotate(${rotation} ${pivotX} ${pivotY}) translate(${x} ${y}) scale(${scale})`}
                                dangerouslySetInnerHTML={{ __html: cosmetic.style }} />
                        </svg>
                    );
                })
            }


            <svg id="penguin">
                <g id="penguin_body" transform={`translate(${viewBoxWidth / 2 - 300},${viewBoxHeight - 700})`}>
                    <path id="tail" d="M139.765 561.556C152.025 579.947 179.145 586.445 191.265 605.056C188.893 609.799 180.115 617.418 174.921 618.944C171.301 620.075 167.887 621.408 164.421 622.944C146.142 630.671 126 635.769 106.112 635.799C105.327 635.803 104.543 635.806 103.734 635.809C102.088 635.814 100.442 635.817 98.7956 635.817C96.3053 635.819 93.8154 635.837 91.3251 635.856C83.1918 635.884 75.6661 635.673 67.7333 633.631C71.0466 626.254 77.9856 621.423 84.3583 616.756C85.0535 616.24 85.7486 615.723 86.4648 615.19C90.7336 612.035 95.0763 609.026 99.4833 606.069C114.056 596.036 129.227 575.527 139.765 561.556Z" fill={penguinColors.dark_main_color} />
                    <g id="left_arm">
                        <path id="top_left_arm" d="M393.107 165.596C387.204 167.252 384.299 185.176 383.511 195.122C380.879 232.188 392.373 320.835 430.404 346.875C443.117 355.579 496.865 319.759 490.204 301.846C489.254 299.29 488.32 296.729 487.391 294.166C477.387 266.742 464.354 240.372 449.251 215.408C448.673 214.448 448.095 213.489 447.5 212.5C414.881 159.424 399.703 163.746 393.107 165.596Z" fill={penguinColors.dark_main_color} />
                        <path id="left_arm_2" d="M430.404 346.875C442.553 355.193 451.25 367.01 459.619 378.897C469.325 392.73 492.708 446.363 509.98 442.28C514.813 440.762 514.56 434.887 514.868 430.005C515.25 400.958 510.469 369.311 503 341.5C502.764 340.619 502.527 339.738 502.283 338.831C498.812 326.051 494.569 313.626 489.941 301.221C488.991 298.666 488.057 296.104 487.128 293.541C480.876 276.288 401.572 325.773 426.749 344.281C427.944 345.16 429.162 346.024 430.404 346.875Z" fill={penguinColors.dark_main_color} />
                    </g>
                    <g id="left_foot">
                        <path id="Vector" d="M389.734 617.631C391.4 619.298 393.067 620.965 394.734 622.631C395.909 623.621 395.909 623.621 397.109 624.631C398.734 626.631 398.734 626.631 398.921 629.006C395.146 637.35 370.963 645.495 362.935 648.828C341.095 657.063 330.171 650.828 325.734 644.631C324.165 641.495 324.352 638.059 324.734 634.631C325.962 631.446 327.533 629.696 330.171 627.569C331.973 626.101 333.662 624.709 335.237 622.998C347 610.228 381.988 609.886 389.734 617.631Z" fill={COLOR7} />
                        <path id="Vector 1" d="M442.435 645.328C441.235 640.528 412.601 630.995 398.435 626.828C393.97 639.392 360.506 650.906 334.97 651.342C336.506 652.406 339.768 653.661 341.935 653.828C344.101 653.828 348.535 654.028 348.935 654.828C362.935 674.328 377.97 665.892 377.435 664.328C376.087 660.392 378.97 657.392 382.435 662.828C385.682 667.923 402.435 667.328 404.935 666.828C406.935 666.428 407.637 659.892 407.47 657.392C415.804 661.059 432.235 668.628 433.435 663.828C434.635 659.028 432.268 655.161 430.935 653.828L440.935 653.328C441.935 652.661 443.635 650.128 442.435 645.328Z" fill={COLOR8} />
                        <path id="Vector_2" d="M373.766 561.007C427.766 561.007 396.317 585.008 391 615.138C386.5 640.638 342.5 632.638 330 619.138C327.564 616.508 326.967 610.91 324.875 606.888C322 601.359 322 601.359 322 599.138C322 559.508 332.766 561.007 373.766 561.007Z" fill={penguinColors.main_color} />
                    </g>
                    <g id="body">
                        <g id="belly">
                            <path id="Vector_3" d="M427.358 211.944C445.796 280.621 470.81 354.812 469.689 425.416C469.282 448.525 466.222 470.364 463.733 493.131C457.692 548.392 143.956 463.01 202.733 231.631C243.233 170.631 369.233 112.631 427.358 211.944Z" fill={COLOR6} />
                            <path id="Vector_4" d="M180.796 343.194C219.765 429.056 335.571 584.817 457.04 519.892C448.714 549.034 425.86 576.66 399.721 591.797C374.847 605.253 346.946 608.988 319.046 609.006C318.245 609.008 317.445 609.01 316.62 609.012C283.802 609.003 249.026 601.62 224.491 578.483C206.194 559.563 192.698 534.19 186.733 508.631C186.562 507.929 186.39 507.226 186.212 506.502C183.146 493.652 181.858 480.564 180.546 467.444C180.461 466.6 180.376 465.755 180.289 464.886C178.435 446.177 177.547 427.612 177.548 408.809C177.546 405.701 177.528 402.593 177.509 399.485C177.462 382.622 177.991 359.815 180.796 343.194Z" fill={COLOR4} />
                            <path id="Vector_5" d="M464.07 490.056C444.97 659.892 186.397 479.413 180.469 368.633C175.265 345.056 193.265 284.056 205 263.559C211 396.559 332.663 491.158 464.07 490.056Z" fill={COLOR5} />
                        </g>
                        <path id="Vector_6" d="M407.818 139.672C405.537 149.619 404.26 156.192 409.671 165.131C419.386 182.348 435.555 213.392 434.505 237.892C429.784 224.725 423.633 210.336 414.734 198.631C414.117 197.817 413.501 197.002 412.866 196.162C397.11 176.958 372.572 169.235 348.734 166.631C310.514 163.554 268.637 179.989 239.761 204.291C199.009 241.96 178.497 352.857 178.546 404.506C178.546 405.569 178.547 406.632 178.547 407.727C178.568 425.443 179.109 442.981 180.734 460.631C180.835 461.787 180.937 462.944 181.042 464.135C185.006 507.981 196.472 554.167 231.546 584.006C240.233 591.396 264.5 601.5 274 603C271.815 610.404 258.696 629.675 248 632.6C235.358 636.057 191.066 623.514 178.734 616.631C147.867 599.403 135.058 590.131 125.322 557.372C121.276 543.662 118.53 529.894 116.25 515.793C115.912 513.725 115.561 511.66 115.193 509.598C95.6744 399.129 134.96 274.196 181.421 172.506C183.813 167.255 186.188 161.996 188.597 156.752C192.996 147.148 196.614 137.474 199.817 127.411C235.756 14.5 432.738 31 407.818 139.672Z" fill={penguinColors.main_color} />
                        <path id="Vector_7" d="M341.5 622.501C313.513 630.221 274.809 632.521 246 633C246 621.856 252.697 607.012 259.5 598.6C300.504 608.597 350.083 605.513 391 596.07C384.267 602.439 370.5 614.501 341.5 622.501Z" fill={penguinColors.light_main_color} />
                        <g id="head">
                            <path id="head_2" d="M385.03 16.8538C389.139 19.5553 392.978 22.4588 396.734 25.6312C397.557 26.3208 398.381 27.0105 399.23 27.721C408.479 35.7311 408.56 37.1194 414 48C417.25 54.5 414 97 412.734 115.631C412.632 116.509 412.53 117.387 412.425 118.291C411.397 125.504 407.5 138 399.5 140C356.894 150.651 190.417 160.5 208 105.5C222.94 58.766 234.606 36.4945 279.734 12.6312C289.433 7.77589 299.22 4.98755 309.734 2.63116C310.338 2.45536 310.942 2.27956 311.565 2.09844C336.25 -3.21991 363.91 3.94969 385.03 16.8538Z" fill={penguinColors.main_color} />
                            <path id="Vector_8" d="M385.031 16.8538C398.765 27.5562 402.349 27.3531 410.734 41.6312C415.924 50.3528 384.829 49.8918 382.441 47.3578C378.172 42.9466 373.634 32.6312 363.234 26.6312C337.234 11.6312 324.265 4.58609 291.765 7.58602C307.265 2.39209 344.765 -10.4438 385.031 16.8538Z" fill={penguinColors.light_main_color} />
                            {/* BEAK */}
                            <svg key={`${twitchId}_${penguinBeak?.name}_${randomId()}`}>
                                <g transform={`rotate(${penguinBeak.rotation} ${penguinBeak.pivotX} ${penguinBeak.pivotY}) translate(${penguinBeak.x} ${penguinBeak.y}) scale(${penguinBeak.scale})`}
                                    dangerouslySetInnerHTML={{ __html: penguinBeak.style }} />
                            </svg>

                            {/* EYES */}
                            <svg key={`${twitchId}_${penguinEyes?.name}_${randomId()}`}>
                                <g transform={`rotate(${penguinEyes.rotation} ${penguinEyes.pivotX} ${penguinEyes.pivotY}) translate(${penguinEyes.x} ${penguinEyes.y}) scale(${penguinEyes.scale})`}
                                    dangerouslySetInnerHTML={{ __html: penguinEyes.style }} />
                            </svg>
                        </g>
                    </g>
                    <g id="right_foot">
                        <path id="Vector_12" d="M247.7 641.328C248.875 642.318 248.875 642.318 250.075 643.328C251.7 645.328 251.7 645.328 251.887 647.703C248.113 656.047 223.929 664.192 215.901 667.525C194.061 675.76 183.137 669.525 178.7 663.328C177.132 660.192 177.318 656.756 177.7 653.328C178.928 650.142 180.499 648.393 183.137 646.266C184.94 644.798 186.628 643.406 188.204 641.695C190.871 639.258 194.247 639.302 197.7 639.328C199.383 639.613 201.059 639.941 202.727 640.301C208.778 641.454 214.617 641.625 220.762 641.578C221.774 641.586 222.785 641.594 223.827 641.602C230.343 641.585 236.367 640.864 242.7 639.328C244.762 638.828 245.246 638.874 247.7 641.328Z" fill={COLOR7} />
                        <path id="Vector 2" d="M295.401 664.025C294.201 659.225 265.568 649.692 251.401 645.525C246.47 659.892 204.47 669.559 188.401 670.192C188.97 670.559 192.734 672.359 194.901 672.525C197.068 672.525 201.501 672.725 201.901 673.525C215.901 693.025 230.968 687.131 230.935 686.328C230.906 685.631 230.935 675.828 235.401 681.525C239.129 686.28 255.401 686.025 257.901 685.525C259.901 685.125 260.637 679.392 260.47 676.892C268.804 680.559 285.201 687.325 286.401 682.525C287.601 677.725 285.234 673.859 283.901 672.525L293.901 672.025C294.901 671.359 296.601 668.825 295.401 664.025Z" fill={COLOR8} />
                        <path id="Vector_13" d="M230.5 578.5C284.5 578.5 253.051 602.5 247.734 632.631C243.234 658.131 199.234 650.131 186.734 636.631C184.297 634 183.7 628.403 181.609 624.381C178.734 618.851 178.734 618.851 178.734 616.631C178.734 577 189.5 578.5 230.5 578.5Z" fill={penguinColors.main_color} />
                    </g>
                    <g id="right_arm">
                        <path id="top_right_arm" d="M194.671 205.006C201.047 208.126 200.607 229.144 199.424 240.633C194.671 283.392 163.047 381.931 114.296 403.631C98 410.885 48.6948 361.5 60.0255 342.496C61.6422 339.784 63.2412 337.063 64.8351 334.338C81.9605 305.203 102.315 277.9 124.734 252.631C125.592 251.659 126.451 250.687 127.335 249.686C175.576 196.068 187.547 201.52 194.671 205.006Z" fill={penguinColors.dark_main_color} />
                        <path id="right_arm_2" d="M114.296 403.631C98.7225 410.563 86.3482 422.2 74.3326 433.986C60.3883 447.709 22.5471 503.892 3.73353 495.631C-1.45277 492.892 0.0635834 486.255 0.733531 480.631C6.37224 447.475 22.4131 415.737 36.7335 385.631C37.187 384.678 37.6404 383.724 38.1076 382.741C44.7331 368.914 52.1623 355.654 60.0255 342.496C61.6422 339.784 63.2412 337.063 64.8351 334.338C75.5614 316 151.54 385.631 119 401.442C117.456 402.193 115.888 402.923 114.296 403.631Z" fill={penguinColors.dark_main_color} />
                    </g>
                </g>
            </svg>

            {
                cosmetics?.map((cosmetic, index) => {
                    if (!cosmetic || cosmetic.type != 'penguin' || cosmetic?.data?.position != "front") return;
                    if (!['hat', 'backpack', 'accessory'].includes(cosmetic.sub_type)) return;
                    let x = cosmetic?.data?.x ?? 0;
                    let y = cosmetic?.data?.y ?? 0;
                    let scale = cosmetic?.data?.scale ?? 1;
                    let rotation = cosmetic?.data?.rotation ?? 0;
                    let pivotX = x + cosmetic?.data?.width * scale / 2;
                    let pivotY = y + cosmetic?.data?.height * scale / 2;

                    return (
                        <svg key={`${twitchId}_${cosmetic?.name}_${index}`}>
                            <g transform={`rotate(${rotation} ${pivotX} ${pivotY}) translate(${x} ${y}) scale(${scale})`}
                                dangerouslySetInnerHTML={{ __html: cosmetic.style }} />
                        </svg>
                    );
                })
            }
        </svg>

    )
}
