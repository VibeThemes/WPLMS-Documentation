'use strict';

// const e = React.createElement;


// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);
document.addEventListener('DOMContentLoaded', function () {

    alert('hiii');
    var items = document.getElementsByClassName('edit-menu-item-classes');

    if (items.length) {
        for (var i = 0; i < items.length; i++) {

            if (items[i].parentNode.parentNode.parentNode.parentNode.className.indexOf('menu-item-depth-0') > -1) {
                (function () {
                    var select = document.createElement('select');
                    var option = document.createElement('option');
                    option.text = window.appointify.disable_megamenu;
                    select.add(option);
                    if (window.appointify.megamenu) {
                        window.appointify.megamenu.map(function (item) {
                            var option = document.createElement('option');
                            Object.keys(item).map(function (key) {
                                option[key] = item[key];
                            });
                            select.add(option);
                        });
                    }
                    items[i].parentNode.insertAdjacentElement('beforeEnd', select);
                })();
            }
        }
    }
});