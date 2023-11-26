import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
export default function SectionHome({ id, filled, reverse, thumbnailSection, PictureLogo, TextLogo, ContentTitle, TextButton, children }) {


    return (
        <section className={`flex-col lg:flex-row px-[16px] py-[64px] lg:px-[64px]  ${id} ${filled ? "filled" : ""} ${reverse ? "reverse" : ""}`}>
            <div className={`thumbnail hidden lg:block lg:max-w-[600px] lg:w-[600px]`}>
                <img src={thumbnailSection} alt="thumbnail" />
            </div>
            <div className="infos flex-1 p-0 lg:px-[64px]">
                <div className="title hidden lg:flex">
                    {PictureLogo !== undefined &&
                        <img src={PictureLogo} alt="WeilsLogo" />
                    }
                    {TextLogo !== undefined &&
                        <>{TextLogo}</>
                    }
                </div>
                <div className="flex-col gap-[64px] flex xl:hidden xl:flex-row xl:gap-0">
                    <div className="flex flex-col justify-center w-full gap-[16px] lg:hidden">
                        <div className="title flex justify-center">
                            {PictureLogo !== undefined &&
                                <img src={PictureLogo} alt="WeilsLogo" />
                            }
                            {TextLogo !== undefined &&
                                <>{TextLogo}</>
                            }
                        </div>
                        <div className={`thumbnail w-full lg:hidden`}>
                            <img src={thumbnailSection} className='w-full h-full' alt="thumbnail" />
                        </div>
                    </div>
                    <div className="content flex">
                        <div className="subtitle">
                            {ContentTitle}
                        </div>
                        <div className="paraph">
                            {children}
                        </div>
                    </div>
                    <div className="actions flex justify-center items-center w-full">
                        <GreenButton className="button_green w-fit">{TextButton}</GreenButton>
                    </div>
                </div>
                <div className="content hidden xl:flex">
                    <div className="subtitle">
                        {ContentTitle}
                    </div>
                    <div className="paraph">
                        {children}
                    </div>
                </div>
                <div className="actions hidden xl:flex justify-center items-center w-full">
                    <GreenButton className="button_green w-fit">{TextButton}</GreenButton>
                </div>
            </div>
        </section>
    )

}
