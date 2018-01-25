import { h, Component } from "preact";
import styled from "styled-components";
import hero from "../assets/hero.jpg";
import heroMin from "../assets/hero-min.jpeg";
import theme from "../style/theme.js";
import lllogo from "../assets/lli-logo.svg";
import { Link } from "preact-router/match";

const { headerImgSize, sidePadding, lightFontColor, overlay, darkBg } = theme;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 24px;

  position: relative;
  height: calc(100vh - ${headerImgSize});
  padding: 0 ${sidePadding};
  color: ${lightFontColor};

  background: transparent;
  background-image: url(${props => props.bg});
  background-image: linear-gradient(${overlay}, ${overlay}),
    url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;

  justify-content: center;
  align-items: center;
  justify-items: center;

  @keyframes appearUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(-50px);
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  h1 {
    opacity: 0;
    text-align: center;
    font-size: 8vw;
    animation: appearUp 1s ease;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
  }

  img {
    opacity: 0;
    animation: appear 1s ease;
    animation-delay: 0.8s;
    animation-fill-mode: forwards;
  }

  .cta {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    padding: 16px;
    background-color: rgba(236, 78, 28, 0.9);
    border: none;
    border-radius: 4px;
    box-shadow: inset -1px -1px 1px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }
`;

const RaceDetailsStyle = styled.section`
  padding: 32px ${sidePadding};

  h1 {
    font-size: 36px;
  }
`;

function renderDetailItem(title, details) {
  return (
    <div>
      <h4>{title}</h4>
      <div>{details}</div>
    </div>
  );
}

function RaceDetails() {
  return (
    <RaceDetailsStyle>
      <h1>2018 Monadnock Full Throttle Triathlon</h1>
      <h3>September 8th, 2018</h3>
      <hr />
      <h2>Race Day Timeline</h2>
      {renderDetailItem(
        "Registration - 7 AM",
        <p>
          Tell us you have arrived and be assigned a bib number. We'll set you
          up with a tracking bracelet and some pre-race fuel.
        </p>
      )}
      {renderDetailItem(
        "Swim - 9 AM",
        <p>
          The race begins with a 1/2 mile swim in Thorndike Pond. Immediately
          following your completion of the swim, you can move to the transition
          area and then onto the bike event.
        </p>
      )}

      {renderDetailItem(
        "Bike",
        <p>
          The bike event follows a 12 mile route around Thorndike Pond. See the
          map below for the detailed route or turn-by-turn directions. The bike
          event ends at the Monadnock State park where there will be a water and
          fuel station to help you push through the hike.
        </p>
      )}

      {renderDetailItem(
        "Hike",
        <p>
          The hike begins with climbing the White Dot Trail to the Monadnock
          summit. From the summit, racers will follow the White Arrow Trail
          until taking a left onto Parker Trail all the way to the finish line.
        </p>
      )}

      {renderDetailItem(
        "Refuel!",
        <p>Join us after the race for food, hydration, and ceremonies.</p>
      )}

      <iframe
        src="https://www.google.com/maps/d/embed?mid=zdWx7yjXwyhw.k1FcH453JfSY"
        width="100%"
        height="480"
      />
    </RaceDetailsStyle>
  );
}

const RegisterBannerStyle = styled(Link)`
  display: block;
  padding: 48px ${sidePadding};
  font-size: 30px;
  color: ${lightFontColor};
  background-color: ${darkBg};
  text-align: center;
  font-weight: 900;
  text-decoration: none;

  @keyframes wiggle {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  span {
    display: block;
    animation: wiggle 1.3s infinite 5s;
  }
`;

function RegisterBanner() {
  return (
    <RegisterBannerStyle href="/register">
      <span>Register now for the 2018 Triathlon</span>
    </RegisterBannerStyle>
  );
}

const InfoStyles = styled.section`
  padding: 48px ${sidePadding};

  .fineprint {
    font-size: 12px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
    align-items: center;
    @media only screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }

    .logo-wrapper {
      text-align: center;
      @media only screen and (max-width: 700px) {
        display: none;
      }

      img {
        width: 100%;
        max-width: 300px;
      }
    }
  }
`;

function Info() {
  return (
    <InfoStyles>
      <h1> Fundraising for Little Lambs International</h1>
      <hr />
      <div className="wrapper">
        <div>
          <p>
            Little Lambs International plans several trips throughout the course
            of a year for volunteers to come and experience Guatemala. These
            groups travel to the construction site of our campus style orphanage
            and help, hands on, with construction and community outreach. You
            too can join us and make a difference.
          </p>
          <p className="fineprint">
            To learn more about the Little Lambs International mission, visit{" "}
            <a href="http://www.littlelambsintl.org/">
              http://www.littlelambsintl.org
            </a>.
          </p>
        </div>
        <div className="logo-wrapper">
          <a href="http://www.littlelambsintl.org/">
            <img
              src={lllogo}
              alt="Little Lambs International Logo and link to website"
            />
          </a>
        </div>
      </div>
    </InfoStyles>
  );
}

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      bg: heroMin
    };
  }
  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          bg: hero
        }),
      1000
    );
  }
  render() {
    return (
      <div>
        <Styles bg={this.state.bg}>
          <h1>
            Monadnock Full <br /> Throttle Triathlon
          </h1>
          <div>
            <Link className="cta" href="/register">
              Register Now
            </Link>
          </div>
          {/* <img src={logo} alt="MFT2 Logo" /> */}
        </Styles>
        <RaceDetails />
        <RegisterBanner />
        <Info />
      </div>
    );
  }
}
