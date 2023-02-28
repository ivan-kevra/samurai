import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {setUserProfile} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";


class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profileInfo={this.props.profile}/>
        )
    }
}

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profileInfo
})

let WithUrlDattaContainerComponent = withRouter(ProfileContainer)


export default connect(mapStateToProps, {setUserProfile})(WithUrlDattaContainerComponent)