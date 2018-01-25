import { h, Component } from "preact";
import styled from "styled-components";
import theme from "../style/theme.js";
import Button from "../components/button";
import { event } from "../lib/tracking";

const WizardStyle = styled.div`
  display: flex;
  flex-direction: column;
  display: grid;

  .choice {
    display: flex;
    flex-direction: column;
    display: grid;
    max-width: 600px;
    grid-template-rows: 1fr 1fr 1fr;
    grid-row-gap: 24px;

    text-align: center;
    align-items: center;

    button {
      width: auto;
      padding: 16px;
      border: 2px solid black;
      background-color: snow;
      text-transform: uppercase;
      font-size: 16px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    max-width: 600px;
    padding-bottom: 16px;

    @media only screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }

    .submit-wrapper {
      grid-column: span 2;
      @media only screen and (max-width: 700px) {
        grid-column: span 1;
      }
    }

    .teamname {
      grid-column: span 2;
      @media only screen and (max-width: 700px) {
        grid-column: span 1;
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      label {
        padding-bottom: 4px;
      }

      input,
      select {
        font-size: 14px;
        padding: 4px;
        border: 1px solid black;
        border-radius: 0;
      }
    }
  }
`;

const ShirtSize = ({ name, onChange, value }) => (
  <div>
    <label for={name}>Shirt Size</label>
    <select value={value} onChange={onChange} name={name} required>
      <option value="">Choose One</option>
      <option>Youth Small</option>
      <option>Youth Medium</option>
      <option>Youth Large</option>
      <option>Women's Small</option>
      <option>Women's Medium</option>
      <option>Women's Large</option>
      <option>Women's XL</option>
      <option>Women's 2XL</option>
      <option>Men's Small</option>
      <option>Men's Medium</option>
      <option>Men's Large</option>
      <option>Men's XL</option>
      <option>Men's 2XL</option>
    </select>
  </div>
);

const TeamName = ({ onChange, value }) => (
  <div className="teamname">
    <label for="team_name">Team Name</label>
    <input
      value={value}
      onChange={onChange}
      type="text"
      name="team_name"
      placeholder="JLA"
      required
    />
  </div>
);

const FirstName = ({ onChange, value }) => (
  <div>
    <label for="first_name">Your First Name</label>
    <input
      value={value}
      onChange={onChange}
      type="text"
      name="first_name"
      placeholder="John"
      required
    />
  </div>
);

const LastName = ({ onChange, value }) => (
  <div>
    <label for="last_name">Your Last Name</label>
    <input
      value={value}
      onChange={onChange}
      type="text"
      name="last_name"
      placeholder="Smith"
      required
    />
  </div>
);

const EmailAddress = ({ onChange, value }) => (
  <div>
    <label for="email">Email Address</label>
    <input
      value={value}
      onChange={onChange}
      type="email"
      name="email"
      placeholder="john@smith.com"
      required
    />
  </div>
);

const City = ({ onChange, value }) => (
  <div>
    <label for="city">City</label>
    <input
      value={value}
      onChange={onChange}
      type="text"
      name="city"
      placeholder="Jaffrey"
      required
    />
  </div>
);

const State = ({ onChange, value }) => (
  <div>
    <label for="state">State</label>
    <input
      value={value}
      onChange={onChange}
      type="text"
      name="state"
      placeholder="New Hampshire"
      required
    />
  </div>
);

const FitnessLevel = ({ onChange, value }) => (
  <div>
    <label for="fitness">Fitness Level</label>
    <select value={value} onChange={onChange} name="fitness" required>
      <option value="">Choose One</option>
      <option>Thinking Twice</option>
      <option>Half Steam</option>
      <option>Full Throttle</option>
    </select>
  </div>
);

class Wizard extends Component {
  updateRegistrationType = type => () => {
    event("REG_STARTED", { event_label: `TYPE:${type}` });
    this.setState({ registrationType: type });
  };

  _submitForm(evt) {
    evt.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state.registrationType, this.state.form);
  }
  _updateFormData(evt, val) {
    this.setState({
      form: {
        ...this.state.form,
        [evt.target.name]: evt.target.value
      }
    });
  }
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this._submitForm = this._submitForm.bind(this);
    this._updateFormData = this._updateFormData.bind(this);
  }

  getInitialState = () => ({
    registrationType: null, // ['SINGLE', 'DOUBLE', 'TRIPLE']
    form: {
      first_name: "",
      last_name: "",
      email: "",
      city: "",
      state: "",
      fitness: "",
      shirt_size_1: "",
      shirt_size_2: "",
      shirt_size_3: ""
    }
  });
  renderChoicePage() {
    return (
      <div className="choice">
        <button onClick={this.updateRegistrationType("SINGLE")}>
          Single $75
        </button>
        <button onClick={this.updateRegistrationType("DOUBLE")}>
          2-Person Team $115
        </button>
        <button onClick={this.updateRegistrationType("TRIPLE")}>
          3-Person Team $135
        </button>
      </div>
    );
  }
  renderTeamForm(type) {
    const {
      team_name,
      first_name,
      last_name,
      email,
      city,
      state,
      fitness,
      shirt_size_1,
      shirt_size_2,
      shirt_size_3
    } = this.state.form;
    return (
      <div className="single">
        <form onSubmit={this._submitForm}>
          <TeamName value={team_name} onChange={this._updateFormData} />
          <FirstName value={first_name} onChange={this._updateFormData} />
          <LastName value={last_name} onChange={this._updateFormData} />
          <EmailAddress value={email} onChange={this._updateFormData} />
          <City value={city} onChange={this._updateFormData} />
          <State value={state} onChange={this._updateFormData} />
          <FitnessLevel value={fitness} onChange={this._updateFormData} />
          {type === "DOUBLE"
            ? [
                <ShirtSize
                  value={shirt_size_1}
                  onChange={this._updateFormData}
                  name="shirt_size_1"
                />,
                <ShirtSize
                  value={shirt_size_2}
                  onChange={this._updateFormData}
                  name="shirt_size_2"
                />
              ]
            : [
                <ShirtSize
                  value={shirt_size_1}
                  onChange={this._updateFormData}
                  name="shirt_size_1"
                />,
                <ShirtSize
                  value={shirt_size_2}
                  onChange={this._updateFormData}
                  name="shirt_size_2"
                />,
                <ShirtSize
                  value={shirt_size_3}
                  onChange={this._updateFormData}
                  name="shirt_size_3"
                />
              ]}

          <div className="submit-wrapper">
            <Button spinning={this.props.loading}>Pay Now</Button>
          </div>
        </form>
      </div>
    );
  }
  renderSingleForm() {
    const {
      first_name,
      last_name,
      email,
      city,
      state,
      fitness,
      shirt_size_1
    } = this.state.form;
    return (
      <div className="single">
        <form onSubmit={this._submitForm}>
          <FirstName value={first_name} onChange={this._updateFormData} />
          <LastName value={last_name} onChange={this._updateFormData} />
          <EmailAddress value={email} onChange={this._updateFormData} />
          <City value={city} onChange={this._updateFormData} />
          <State value={state} onChange={this._updateFormData} />
          <FitnessLevel value={fitness} onChange={this._updateFormData} />
          <ShirtSize
            value={shirt_size_1}
            onChange={this._updateFormData}
            name="shirt_size_1"
          />

          <div className="submit-wrapper">
            <Button spinning={this.props.loading}>Pay Now</Button>
          </div>
        </form>
      </div>
    );
  }
  renderContent({ registrationType }) {
    if (!registrationType) {
      return this.renderChoicePage();
    }

    switch (registrationType) {
      case "SINGLE":
        return <div key="single">{this.renderSingleForm()}</div>;
      case "DOUBLE":
      case "TRIPLE":
        return <div key="team">{this.renderTeamForm(registrationType)}</div>;
    }

    return <pre>{JSON.stringify(this.state, null, 3)}</pre>;
  }
  render() {
    return (
      <WizardStyle loading={this.props.loading}>
        {this.renderContent(this.state)}
      </WizardStyle>
    );
  }
}

const { sidePadding } = theme;

const Style = styled.div`
  padding-left: ${sidePadding};
  padding-right: ${sidePadding};
  display: flex;
  flex-direction: column;

  p.error {
    font-size: 18px;
    color: #ff0033;
    font-weight: bold;
  }
`;

export default class Register extends Component {
  postRegister(token, form) {
    this.setState({ loading: true });

    return fetch(`${window.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        form
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          event("CHECKOUT_ERROR", { event_label: res.error.message });
          this.setState({ loading: false, error: res.error });
        } else {
          event("CHECKOUT_SUCCESS", { event_label: `TYPE:${form.type}` });
          this.setState({
            loading: false,
            checkoutComplete: true,
            error: null
          });
        }
      });
  }
  checkout(type, form) {
    event("CHECKOUT_STARTED", { event_label: `TYPE:${type}` });
    const amounts = {
      SINGLE: 7500,
      DOUBLE: 11500,
      TRIPLE: 13500
    };

    this.setState({ loading: true });

    const amount = amounts[type];

    const handler = window.StripeCheckout.configure({
      key: window.config.stripe_pk,
      image: "/assets/logo.png",
      locale: "auto",
      token: token =>
        this.postRegister(token, {
          ...form,
          amount,
          type
        })
    });

    handler.open({
      name: "MFT2",
      description: `${type} Registration`,
      amount,
      email: form.email,
      closed: () => this.setState({ loading: false })
    });

    window.addEventListener("popstate", () => {
      this.handler.close();
    });
  }
  constructor() {
    super();

    this.state = {
      checkoutComplete: false,
      form: null,
      error: null,
      loading: false
    };

    this.checkout = this.checkout.bind(this);
  }
  render() {
    return (
      <Style>
        <h1>Register</h1>

        {this.state.checkoutComplete ? (
          <h4>Thank You!</h4>
        ) : (
          <Wizard onSubmit={this.checkout} loading={this.state.loading} />
        )}
        <p className="error">{this.state.error}</p>

        <ul>
          <li>
            You must be 18 on race day or bring a guardian to sign the liability
            waiver.
          </li>
          <li>
            Send us a message on our{" "}
            <a
              href="https://www.facebook.com/MonadnockFullThrottle/"
              target="_blank"
            >
              facebook page
            </a>{" "}
            if you have any questions.
          </li>
        </ul>
      </Style>
    );
  }
}
