import { h, Component } from "preact";

export default class ProgressiveImage extends Component {
  state = {
    loading: true
  };
  onLoad = () => {
    this.setState({ loading: false });
  };
  loadImage() {
    const image = new Image();
    image.onload = this.onLoad;
    image.onError = err => console.error("Image Error", err);
    image.src = this.props.src;
  }

  componentDidMount() {
    setTimeout(() => {
      this.loadImage();
    }, 1000);
  }
  render() {
    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <img
          style={{ position: "absolute", width: "100%" }}
          src={this.props.src}
          alt={this.props.alt}
        />
        <img
          style={{
            position: "absolute",
            width: "100%",
            opacity: this.state.loading ? 1 : 0,
            transition: "opacity 650ms ease-in"
          }}
          src={this.props.placeholder}
          alt={this.props.alt}
        />
      </div>
    );
  }
}
