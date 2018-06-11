import { h, Component } from "preact";
import style from "./home.less";
import lllogo from "../assets/lli-logo.svg";
import { Link } from "preact-router/match";
import ProgressiveImage from "../components/ProgressiveImage";

function renderDetailItem(title, details) {
  return (
    <div>
      <h4>{title}</h4>
      <div>{details}</div>
    </div>
  );
}

class RaceDetails extends Component {
  state = {
    showMap: false
  };
  componentDidMount() {
    // requestAnimationFrame(() => {
    //   requestAnimationFrame(() => {
    //     this.setState({
    //       showMap: true
    //     });
    //   });
    // });
  }
  render() {
    return (
      <section class={style.raceDetail}>
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
            following your completion of the swim, you can move to the
            transition area and then onto the bike event.
          </p>
        )}

        {renderDetailItem(
          "Bike",
          <p>
            The bike event follows a 11.2 mile route around Thorndike Pond. See
            the map below for the detailed route or turn-by-turn directions. The
            bike event ends at the Monadnock State park where there will be a
            water and fuel station to help you push through the hike.
          </p>
        )}

        {renderDetailItem(
          "Hike",
          <p>
            The 5.3 mile hike starts at the campground, follows the remainder of
            the road up to the state park. Athletes will climb the White Dot
            trail, descend the White Cross trail and finish back at the
            campground.
          </p>
        )}

        {renderDetailItem(
          "Refuel!",
          <p>Join us after the race for food, hydration, and ceremonies.</p>
        )}

        {this.state.showMap ? (
          <iframe
            src="https://www.google.com/maps/d/embed?mid=zdWx7yjXwyhw.k1FcH453JfSY"
            width="100%"
            height="480"
          />
        ) : null}
      </section>
    );
  }
}

function RegisterBanner() {
  return (
    <Link href="/register" class={style.registerBanner}>
      <span>Register now for the 2018 Triathlon</span>
    </Link>
  );
}

function Info() {
  return (
    <section class={style.info}>
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
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <div class={style.hero}>
        <ProgressiveImage
          src="/assets/hero.jpg"
          placeholder="/assets/hero-geo.svg"
        />
        <h1>
          Monadnock Full <br /> Throttle Triathlon
        </h1>
        <div>
          <Link className="cta" href="/register">
            Register Now
          </Link>
        </div>
      </div>
      <RaceDetails />
      <RegisterBanner />
      <Info />
    </div>
  );
}
