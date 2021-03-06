import { h, Component } from "preact";
import style from "./home.less";
import lllogo from "../assets/lli-logo.svg";
import hammerLogo from "../assets/hammerlogo.png";
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
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({
          showMap: true
        });
      });
    });
  }
  render() {
    return (
      <section class={style.raceDetail}>
        <h1>2019 Monadnock Full Throttle Triathlon</h1>
        <h3>September 7th, 2019</h3>
        <hr />
        <h2>
          {`Race Day Itinerary - `}
          <a style={{ fontSize: 16 }} href="/assets/mft2-map.pdf">
            Download Map
          </a>
        </h2>
        {renderDetailItem(
          "Registration - 7 AM at Monadnock Christian Ministries Campground",
          <p>
            We recommend that you drop off your bike at the Shattuck Park public
            beach prior to check-in. Parking for the event is provided at the
            campground and shuttles are available to get back to the beach
            before the start of the race. Remember to stick around after you
            finish to refuel and watch the award ceremonies.
          </p>
        )}
        {renderDetailItem(
          "Swim - 9 AM",
          <p>
            The race begins with a 1/2 mile swim in Thorndike Pond. Immediately
            following your completion of the swim, transition into the biking
            segment right at the beach.
          </p>
        )}

        {renderDetailItem(
          "Bike",
          <p>
            The bike event follows a 11.2 mile route around Thorndike Pond. See
            the map below for the detailed route or turn-by-turn directions. The
            bike event ends at the campground where there will be a water
            station to help you push through the hike.
          </p>
        )}

        {renderDetailItem(
          "Hike",
          <p>
            The 5.3 mile hike starts at the campground and follows the remainder
            of the road up to the state park. Athletes will climb the White Dot
            trail on Mt. Monadnock, descend the White Cross trail and finish
            back at the campground.
          </p>
        )}

        {renderDetailItem(
          "Water Stations",
          <p>
            There is only one water station along the bike route so please plan
            accordingly. There will be at least 2 water stations along the hike
            route to the Monadnock summit and several more volunteer stations
            along the way if you need anything. You can recognize a volunteer by
            the race t-shirt and exclamatory shouts of encouragement.
          </p>
        )}

        {renderDetailItem(
          "Refuel at the Monadnock Christian Ministries Campground",
          <div>
            <p>
              Join us after the race at the finish line for food, hydration, and
              ceremonies.
            </p>
            <p style={{ display: "flex", alignItems: "center" }}>
              <img src={hammerLogo} style={{ height: 100, paddingRight: 50 }} />
              Race supplements and materials provided by one of our sponsors
              Hammer Nutrition.
            </p>
          </div>
        )}
      </section>
    );
  }
}

function RegisterBanner() {
  return (
    <Link href="/register" class={style.registerBanner}>
      <span>Register now for the 2019 Triathlon</span>
    </Link>
  );
}

function Info() {
  return (
    <section class={style.info}>
      <h1> Fundraising for Little Lambs International</h1>
      <hr />
      <div className={style.wrapper}>
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
            </a>
            .
          </p>
        </div>
        <div className={style["logo-wrapper"]}>
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
          <Link className={style.cta} href="/register">
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
