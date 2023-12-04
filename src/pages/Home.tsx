import FormDataCardList from '../components/FormDataCardList';
import Header from '../components/Header';

const Home = (): JSX.Element => {
  return (
    <div className="home__page">
      <Header isHomePage={true} />
      <FormDataCardList />
    </div>
  );
};

export default Home;
