import "./Playlist.scss";

const Playlist = () => {
  return (
    <div className="playlist">
      <div className="playlist__header">
        <div className="playlist__image">
          <img
            src="https://images.unsplash.com/photo-1653299832314-5d3dc1e5a83c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
            alt="Playlist cover"
          />
        </div>
        <div className="playlist__info">
          <p>Playlist</p>
          <h1 className="artist__name">Russian hits</h1>
          <p>👨 * Maqsud Tolipov * 46 songs</p>
        </div>
      </div>

      <div className="playlist__songs">a</div>
    </div>
  );
};

export default Playlist;
