import '../../styles/SideBar.css'
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3">
      <NavLink
        to="/search"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        Search
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        Explore
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        Favorites
      </NavLink>

      <NavLink
        to="/playlists"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        PlayLists
      </NavLink>

      <NavLink
        to="/albums"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        Albums
      </NavLink>

      <NavLink
        to="/genres"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        Genres
      </NavLink>

      <NavLink
        to="/artists"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "text-white" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >
        Artist
      </NavLink>
    </div>
  );
}