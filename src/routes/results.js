import { h } from "preact";
import styled from "styled-components";
import theme from "../style/theme.js";

const { sidePadding } = theme;

const Style = styled.div`
  padding-left: ${sidePadding};
  padding-right: ${sidePadding};
  display: flex;
  flex-direction: column;
`;

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
  console.log(year);
  return (
    <div>
      <Style>
        <h1>{year} Results</h1>
        <p>
          For full race results, visit{" "}
          <a href="http://my3.raceresult.com/81740/">my3.raceresult.com</a>.
        </p>
        <Winners />
      </Style>
    </div>
  );
}
