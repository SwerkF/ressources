import { reuleaux } from 'ldrs'
import { Fragment } from 'react/jsx-runtime'

reuleaux.register()

const Loader = () => {

    return (
        <Fragment>
            <div className='flex flex-col items-center justify-center mt-10'>
                <l-reuleaux
                    size="37"
                    stroke="5"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.2" 
                    color="coral"
                ></l-reuleaux>
                <p className='mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200'>Chargement...</p>
            </div>
        </Fragment>
    )
}

export default Loader