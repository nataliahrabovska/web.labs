import Banner from "../components/banner/Banner"
import FeaturedLaptops from "../components/featured_laptops/FeaturedLaptops"
import ButtonViewMore from "../components/bvm/ButtonViewMore"

function Home () {
    return (
        <>
            <Banner />
            <FeaturedLaptops/>
            <ButtonViewMore/> 
        </>
    )
}

export default Home