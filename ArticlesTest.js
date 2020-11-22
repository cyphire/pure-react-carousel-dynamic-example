import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import parser from 'html-react-parser';


const DEFAULT_HEIGHT = 500;

const myParse = (input) => {
		  let parsec = parser(input);
		  return parsec;
	  }

class Articles extends Component {

	constructor(props){
        super(props)
		this.counter = 0;
		this.myRef = React.createRef();

		this.masterObjArray = [];

		this.props.articles.forEach((art, index) => { 

			this.masterObjArray.push(
				{
					objIndex: 		index,
					article_index:	art.article_index,
					article_height: DEFAULT_HEIGHT,
					article_ref:	React.createRef()
				}
			)			
		})

        this.state = {
			width: 0,
			columns: 3,
			height: DEFAULT_HEIGHT
		}
      }

	  componentDidMount() {
		// resize of window listener...
		window.addEventListener('resize', () => this.handleResize(this.myRef.current))

		// new window width.
		let newSize = this.myRef.current.getBoundingClientRect().width;

		// set the new width and the new number of columns
		this.setState({width: newSize, columns: this.getColumnSize(newSize)})

		// update the masterObjArray with the new height for each article
		this.masterObjArray.forEach((obj, idx, arr) => {
			console.log(obj.article_index)
			// Note... Each article has it's OWN ref created in the render()
			let newSize = obj.article_ref.current.getBoundingClientRect().height;
			arr[idx].article_height = newSize;
		})

		let maxHeight = 0;
		this.masterObjArray.forEach(each => {
			// for each article, if the height is bigger than the last (always works as starts at 0, update the max height)
			if (parseInt(each.article_height) > maxHeight)
				maxHeight = parseInt(each.article_height)
		})

		this.setState({height: maxHeight})
	  }

	  componentWillUnmount() {
		window.removeEventListener('resize', () => this.handleResize(this.myRef.current))
	  }

	// here is where my html decides how many columns it gets based on width.
	getColumnSize(newSize) {
		let cols = 3;
		if (newSize < 700)
			cols = 1;
		else if (newSize < 900)
			cols = 2;
		return(cols)
	}

	// this is from the resize event...
	  handleResize = (ref) => {
		
		if (ref) {
			let newSize = ref.getBoundingClientRect().width;
			this.setState({
				width: newSize,
				columns: this.getColumnSize(newSize)
			})
		} else {
			this.counter += 1;
			console.log(`this.myRef is null ${this.counter}`)
		}

		// recalculate sizes as the resize of browser makes some columns bigger or smaller...
		this.masterObjArray.forEach((obj, idx, arr) => {
			if (obj.article_ref && obj.article_ref.current) {
				let newSize = obj.article_ref.current.getBoundingClientRect().height;
				arr[idx].article_height = newSize;
			} else {
				console.log(`obj.article_ref is null ${JSON.stringify(obj)}`);
			}
		})

		let maxHeight = 0;
		this.masterObjArray.forEach(each => {
			if (parseInt(each.article_height) > maxHeight)
				maxHeight = parseInt(each.article_height)
		})
		this.setState({height: maxHeight})

	  }

    render() {

		let out = []; 
		
		this.props.articles.forEach((element, index) => { 
			let linkdetail = "/article/" +  element.article_id;
			out.push(
				<Slide index={index} key={index}>
					<div class="single-blog-post svg" 
					// Note: this is where the reference to this article is created for React to update it's height
						ref={ this.masterObjArray[index].article_ref }
					>
						
						<div class="blog-post-content">
							<h3>
									<ul>{`tallest: ${this.state.height}`}</ul>
									<ul>{`thisheight: ${parseInt(this.masterObjArray[index].article_height)}`}</ul>
									<ul>{`indexWithin:${this.masterObjArray[index].article_index}`}</ul>
									<ul>{`indexofAll: ${index}`}</ul>
									<br />								
									{myParse(element.article_title)}
									<br />								
								
							</h3>

							<span>
								By 
								
									<p>admin</p>
								
							</span>

							<ul>{myParse(element.article_sub)}</ul>
								<p class="read-more-btn">Read More </p>
						</div>
					</div>	
				</Slide>
			)
		})
	
		return (
			<div id="articles" name="articles" key={this.state.columns}>
				<section class="repair-partner-area bg-f9fafb">
					<div class="container" ref={this.myRef} >
						<CarouselProvider 
							totalSlides={this.props.articles.length}
							naturalSlideWidth={this.state.width / this.state.columns}
							naturalSlideHeight={this.state.height}
							visibleSlides={this.state.columns}
						>
							<div class="row" >
								<div class="col-lg-1 col-md-1 col-sm-1" style={{alignSelf: 'center'}}>
									<ButtonBack>Prev</ButtonBack>
								</div>
								<div class="col-lg-10 col-md-10 col-sm-10">
									<h1 class="t-center">A GENERIC TITLE</h1>
								</div>
								<div class="col-lg-1 col-md-1 col-sm-1" style={{alignSelf: 'center'}}>
									<ButtonNext>Next</ButtonNext>
								</div>
							</div>
											
							<Slider>
								<div class="row">
									{out}
								</div>
							</Slider>
						</CarouselProvider>
					</div>
				</section>
			</div>
		)
	}
}

export default Articles;
