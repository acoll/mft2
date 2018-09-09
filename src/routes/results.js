import { h, Component } from "preact";
import style from "./results.less";

const results = {
  "2016": {
    timesUrl: "https://my2.raceresult.com/60636/",
    winners: [
      {
        category: "First Place Male",
        time: "1:53:05.0",
        names: ["Lars Sauvola"]
      },
      {
        category: "First Place Female",
        time: "2:37:23.8",
        names: ["Wendy Price"]
      },
      {
        names: ["Team Emery"],
        time: "2:39:36.4",
        category: "First Place 2-Person Team"
      },
      {
        names: ["Team Carver"],
        time: "2:00:36.2",
        category: "First Place 3-Person Team"
      }
    ]
  },
  "2017": {
    timesUrl: "https://my3.raceresult.com/81740/",
    winners: [
      {
        category: "First Place Male",
        time: "1:55:47.0",
        names: ["Lars Sauvola"]
      },
      {
        category: "First Place Female",
        time: "2:17:46.2",
        names: ["Kathy Maddock"]
      },
      {
        names: ["Team Rautiola"],
        time: "2:01:52.0",
        category: "First Place 2-Person Team"
      },
      {
        names: ["Team Jayasurium"],
        time: "3:53:10.1",
        category: "First Place 3-Person Team"
      }
    ]
  },
  "2018": {
    timesUrl: "https://my2.raceresult.com/106876/",
    winners: [
      {
        category: "First Place Male",
        time: "1:53:46.9",
        names: ["Lars Sauvola"]
      },
      {
        category: "First Place Female",
        time: "2:37:13.5",
        names: ["Wendy Price"]
      },
      {
        names: ["Whistling Marmots"],
        time: "2:08:06.3",
        category: "First Place 2-Person Team"
      },
      {
        names: ["Have Shoes - Will Throttle"],
        time: "1:59:27.6",
        category: "First Place 3-Person Team"
      }
    ]
  }
};

class Album extends Component {
  componentDidMount() {
    return fetch(`${window.API_URL}/photos/${this.props.year}`)
      .then(res => res.json())
      .then(({ data }) => this.setState({ photos: data }));
  }
  renderPhoto({ image, link }) {
    const src = image.source;

    return (
      <a href={link} target="_blank">
        <img src={src} alt="Photo From FB" />
      </a>
    );
  }
  render() {
    if (!this.state.photos) {
      return <div>Loading Photos</div>;
    }

    const sorted = this.state.photos
      .map(photo => ({
        image: photo.images[1],
        link: photo.link
      }))
      .sort((a, b) => a.image.height - b.image.height);

    return <div class={style.photos}>{sorted.map(this.renderPhoto)}</div>;
  }
}

function Winner({ names, overallTime, description }) {
  return (
    <div>
      {names.map(name => (
        <h5>{name}</h5>
      ))}
      <p class={style.fineprint}>Overall Time: {overallTime}</p>
      <p>{description}</p>
    </div>
  );
}

function Winners({ year }) {
  const { winners } = results[year];

  return (
    <section class={style.winners}>
      {winners.map(winner => (
        <Winner
          key={winner.names}
          names={winner.names}
          overallTime={winner.time}
          description={winner.category}
        />
      ))}
    </section>
  );
}

export default function Results({ year }) {
  const url = results[year].timesUrl;
  return (
    <div class={style.page}>
      <h1>{year} Results</h1>
      <p>
        For full race results, visit <a href={url}>my3.raceresult.com</a>.
      </p>
      <Winners year={year} />
      <div style={{ height: 100 }} />
      <Album year={year} />
    </div>
  );
}
