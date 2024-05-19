import { Fragment } from "react/jsx-runtime";
import Button from "../Button/Button";

const Hero = (props:any) => {
    // props: title, subtitle, image, buttonText, buttonLink, imageSide, widthClass, backgroundColorClass, titleColorClass, subtitleColorClass, textCenter, secondButtonText (optional), secondButtonLink (optional)

    return (
        <div className={`${props.widthClass ? props.widthClass : 'w-full'} mx-auto my-[3rem] p-6 sm:px-6 lg:px-8 ${props.backgroundColorClass}`}>
            <div className={`grid ${props.image && 'md:grid-cols-2'} ${props.textCenter && 'text-center'} gap-4 md:gap-8 xl:gap-20 md:items-center`}>
                {props.imageSide === 'left' ? (
                    <Fragment>
                        {props.image && (
                            <div className="relative ms-4">
                                <img className="w-full rounded-md" src={props.image} alt={props.image} />
                            </div>
                        )}
                        <div>
                            <h1 className={`block text-3xl font-bold sm:text-4xl lg:text-6xl lg:leading-tight ${props.titleColorClass ? props.titleColorClass : 'text-gray-800  dark:text-white'}`}>{props.title}</h1>
                            <p className={`mt-3 text-lg ${props.subtitleColorClass ? props.subtitleColorClass : 'text-gray-800 dark:text-neutral-400'}`}>{props.subtitle}</p>

                            {props.buttonText && props.buttonLink && (
                                <div className={`mt-7 grid gap-3 w-full sm:inline-flex ${props.textCenter && "justify-center"}`}>
                                    <Button text={props.buttonText} onClick={() => {window.location.href = props.buttonLink;}} />
                                    {props.secondButtonText && props.secondButtonLink && (
                                        <Button text={props.secondButtonText} color="neutral" onClick={() => {window.location.href=props.secondButtonLink;}} />
                                    )}
                                </div>
                            )}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>
                            <h1 className={`block text-3xl font-bold sm:text-4xl lg:text-6xl lg:leading-tight ${props.titleColorClass ? props.titleColorClass : 'text-gray-800  dark:text-white'}`}>{props.title}</h1>
                            <p className={`mt-3 text-lg ${props.subtitleColorClass ? props.subtitleColorClass : 'text-gray-800 dark:text-neutral-400'}`}>{props.subtitle}</p>

                            {props.buttonText && props.buttonLink && (
                                <div className={`mt-7 grid gap-3 w-full sm:inline-flex ${props.textCenter && "justify-center"}`}>
                                    <Button text={props.buttonText} onClick={() => {window.location.href = props.buttonLink;}} />
                                    {props.secondButtonText && props.secondButtonLink && (
                                        <Button text={props.secondButtonText} color="neutral" onClick={() => {window.location.href=props.secondButtonLink;}} />
                                    )}
                                </div>
                            )}
                        </div>
                        {props.image && (
                            <div className="relative ms-4">
                                <img className="w-full rounded-md" src={props.image} alt={props.image} />
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    )


}

export default Hero;