import Home from "../Components/Home";
import { connect } from "react-redux";
import { addToCart } from "../services/action/Action";

const mapStateToProps = (state) => ({
  // data:state.cardItems
});
const mapDispatchToProps = (dispatch) => ({
  addToCartHandler: (data) => dispatch(addToCart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
