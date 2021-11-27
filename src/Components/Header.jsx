
import NavigationBar from './NavigationBar'
import SearchBar from './SearchBar';

const Header = () => {
    require('../StyleSheet/Header.css');
    return (
        <>



            <section className="cover_photo">
                <div className="overlay">
                    <NavigationBar />
                    <div className="titale_div">
                        <h1>The Simplest Way</h1>
                        <h1>To Find Your Dream Home</h1>
                    </div>

                    <div id='search' className="search_div">
                        <h1>Search Properties</h1>
                        <SearchBar />
                    </div>

                </div>
            </section>


        </>
    );
}

export default Header;