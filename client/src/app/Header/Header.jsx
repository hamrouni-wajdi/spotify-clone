import './Header.scss';

const img =
  'https://images.unsplash.com/photo-1684654488308-2229de99e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

const Header = (props) => {
  const latest = [1, 2, 3, 4, 5, 6];

  return (
    <div className='app-header'>
      <h1 className='h1'>Good Morning</h1>
      <div className='app-header__latest'>
        {latest.map((el) => (
          <div className='app-header__latest-card'>
            <img src={img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
