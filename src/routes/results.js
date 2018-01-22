import { h, Component } from "preact";
import styled from "styled-components";
import theme from "../style/theme.js";

const { sidePadding } = theme;

const Style = styled.div`
  padding-left: ${sidePadding};
  padding-right: ${sidePadding};
  display: flex;
  flex-direction: column;
`;

const PhotosStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    width: 100%;
  }
`;

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

    return <PhotosStyle>{sorted.map(this.renderPhoto)}</PhotosStyle>;
  }
}

const WinnersStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 16px;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  .fineprint {
    font-size: 12px;
  }

  h5 {
    font-weight: 900;
    font-size: 16px;
  }
`;

function Winner({ names, overallTime, description }) {
  return (
    <div>
      {names.map(name => <h5>{name}</h5>)}
      <p className="fineprint">Overall Time: {overallTime}</p>
      <p>{description}</p>
    </div>
  );
}

function Winners() {
  return (
    <WinnersStyles>
      <Winner
        names={["Lars Sauvola"]}
        overallTime="1:55:47.0"
        description={[
          <span>First Place Overall</span>,
          <br />,
          <span>First Place Male</span>
        ]}
      />
      <Winner
        names={["Kathy Maddock"]}
        overallTime="2:17:46.2"
        description="First Place Female"
      />
      <Winner
        names={["Team Rautiola"]}
        overallTime="2:01:52.0"
        description="First Place 2-Person Team"
      />
      <Winner
        names={["Team Jayasurium"]}
        overallTime="3:53:10.1"
        description="First Place 3-Person Team"
      />
    </WinnersStyles>
  );
}

export default function Results({ year }) {
  return (
    <div>
      <Style>
        <h1>{year} Results</h1>
        <p>
          For full race results, visit{" "}
          <a href="http://my3.raceresult.com/81740/">my3.raceresult.com</a>.
        </p>
        <Winners />
        <Album year={year} />
      </Style>
    </div>
  );
}
