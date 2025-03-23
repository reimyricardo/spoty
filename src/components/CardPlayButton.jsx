import { Pause, Play } from "./Player";
import { usePlayerStore } from "../store/playerStore";

export function CardPlayButton({ id, size = "small" }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayinglist = isPlaying && currentMusic?.playlist?.id === id;

  const handleClick = () => {
    if (isPlayinglist) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });
      });
  };

  const iconClass = size === "small" ? "w-8 h-8" : "w-10 h-10";
  return (
    <button
      onClick={handleClick}
      className="Card-play-button rounded-full bg-green-400 hover:scale50 transition hover:bg-green-200 "
    >
      {isPlayinglist ? (
        <Pause className={iconClass} />
      ) : (
        <Play className={iconClass} />
      )}
    </button>
  );
}
