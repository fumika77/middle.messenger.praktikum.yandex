import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { getProfileInfo } from '../../services/AuthService';
import { updateProfileAvatar } from '../../services/ProfileService';

type ProfileImagePageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class ProfileImage extends Block {
    constructor(props: ProfileImagePageProps) {
        super(props);
        this.setProps({
            filename: () => this.props.store.getState().file?.name,
            onBackArrowClick: () => this.props.router.go('/profile-settings'),
        });
    }

    protected getStateFromProps() {
        this.state = {
            onChange: () => {
                const file = document.getElementById('inputFile')!.files![0];
                this.props.store.dispatch({ file });
            },
            onClick: () => {
                const { file } = this.props.store.getState();
                file && this.props.store.dispatch(updateProfileAvatar, file);
            },
        };
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
    }

    render() {
        // language=hbs
        return `
            <main> 
            <div class="profile__image__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                {{{InputFile onChange=onChange filename=filename}}} 
                {{{Button text="Сохранить" onClick=onClick}}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(ProfileImage));
