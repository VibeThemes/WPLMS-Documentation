'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _facebookLoginRenderProps = require('react-facebook-login/dist/facebook-login-render-props');

var _facebookLoginRenderProps2 = _interopRequireDefault(_facebookLoginRenderProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	var _wp$element = wp.element,
	    createElement = _wp$element.createElement,
	    useState = _wp$element.useState,
	    useEffect = _wp$element.useEffect,
	    Fragment = _wp$element.Fragment,
	    render = _wp$element.render;


	var Login = function Login(props) {
		var _useState = useState(false),
		    _useState2 = _slicedToArray(_useState, 2),
		    popup = _useState2[0],
		    setPopup = _useState2[1];

		// useEffect(
		// 	()=>{(y =>{
		// 			fetch(`https://jsonplaceholder.typicode.com/posts`).then((response)=>{
		// 				console.log(response);
		// 				setResources(response.status);
		// 			});

		// 		})(resources)
		// 	},
		// 	[resources]
		// );


		setmyPopup = function setmyPopup() {
			setPopup(true);
		};

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'span',
				{ onClick: setmyPopup },
				props.title
			),
			popup ? wp.element.createElement(
				'div',
				{ className: 'loginpopup_wrapper' },
				wp.element.createElement(
					'div',
					{ className: 'login_popup active' },
					wp.element.createElement(
						'h2',
						null,
<<<<<<< Updated upstream
						'Welcome to Login form'
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'label',
							{ className: 'label' },
							'Name'
						),
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement('input', { className: 'input', type: 'text', placeholder: 'Text input' })
=======
						props.title
					),
					createElement(
						"div",
						{ className: "field with_border" },
						createElement(
							"label",
							{ className: "label" },
							"Name"
						),
						createElement(
							"div",
							{ className: "control no_border" },
							createElement("input", { className: "input", type: "text", placeholder: "Text input" })
>>>>>>> Stashed changes
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'label',
							{ className: 'label' },
							'Username'
						),
						wp.element.createElement(
							'div',
							{ className: 'control has-icons-left has-icons-right' },
							wp.element.createElement('input', { className: 'input is-success', type: 'text', placeholder: 'Text input', value: 'bulma' }),
							wp.element.createElement(
								'span',
								{ className: 'icon is-small is-left' },
								wp.element.createElement('i', { className: 'fas fa-user' })
							),
							wp.element.createElement(
								'span',
								{ className: 'icon is-small is-right' },
								wp.element.createElement('i', { className: 'fas fa-check' })
							)
						),
						wp.element.createElement(
							'p',
							{ className: 'help is-success' },
							'This username is available'
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'label',
							{ className: 'label' },
							'Email'
						),
						wp.element.createElement(
							'div',
							{ className: 'control has-icons-left has-icons-right' },
							wp.element.createElement('input', { className: 'input is-danger', type: 'email', placeholder: 'Email input', value: 'hello@' }),
							wp.element.createElement(
								'span',
								{ className: 'icon is-small is-left' },
								wp.element.createElement('i', { className: 'fas fa-envelope' })
							),
							wp.element.createElement(
								'span',
								{ className: 'icon is-small is-right' },
								wp.element.createElement('i', { className: 'fas fa-exclamation-triangle' })
							)
						),
						wp.element.createElement(
							'p',
							{ className: 'help is-danger' },
							'This email is invalid'
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'label',
							{ className: 'label' },
							'Subject'
						),
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement(
								'div',
								{ className: 'select' },
								wp.element.createElement(
									'select',
									null,
									wp.element.createElement(
										'option',
										null,
										'Select dropdown'
									),
									wp.element.createElement(
										'option',
										null,
										'With options'
									)
								)
							)
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'label',
							{ className: 'label' },
							'Message'
						),
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement('textarea', { className: 'textarea', placeholder: 'Textarea' })
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement(
								'label',
								{ className: 'checkbox' },
								wp.element.createElement('input', { type: 'checkbox' }),
								'I agree to the ',
								wp.element.createElement(
									'a',
									{ href: '#' },
									'terms and conditions'
								)
							)
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field' },
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement(
								'label',
								{ className: 'radio' },
								wp.element.createElement('input', { type: 'radio', name: 'question' }),
								'Yes'
							),
							wp.element.createElement(
								'label',
								{ className: 'radio' },
								wp.element.createElement('input', { type: 'radio', name: 'question' }),
								'No'
							)
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'field is-grouped' },
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement(
								'button',
								{ className: 'button is-link' },
								'Submit'
							)
						),
						wp.element.createElement(
							'div',
							{ className: 'control' },
							wp.element.createElement(
								'button',
								{ className: 'button is-text' },
								'Cancel'
							)
						)
					)
				)
			) : ''
		);
	};

<<<<<<< Updated upstream
	render(wp.element.createElement(Login, { title: document.querySelector(".appointify_login").textContent }), document.querySelector(".appointify_login"));
=======
	render(createElement(Login, { title: document.querySelector(".appointify_login").textContent }), document.querySelector(".appointify_login"));
	// wp.element.render( <Greeting  toWhom='World' /> ,
	//     document.querySelector(".bp-menu.bp-logout-nav") 
	// );
>>>>>>> Stashed changes
});