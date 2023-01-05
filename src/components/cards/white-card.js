export const WhiteCard = ({children, sectionTitle}) => {
    return(
        <section className="relative w-full bg-white p-4 font-lato mb-4 shadow-lg">
            {
            sectionTitle && 
            <div className='font-bold pb-4 items-center'>
                <h1 className="text-center">{sectionTitle}</h1>
            </div>
            }
            {children}
        </section>
    )
}