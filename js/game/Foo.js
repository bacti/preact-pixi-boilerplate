import { h, render, Component } from 'preact'
// import linkState from 'linkstate';
import 'linkstate/polyfill'

class Bar extends Component {
    componentDidMount()
    {
        this.text = 'cookie'
        console.log('candy 1', this.state.text)
    }
    componentDidUpdate()
    {
        console.log('candy 2', this.state.text)
    }
    render({ }, { text }) {
        console.log('candy 3', this.state)
        return <div>abc</div>;
    }
}
export default class Foo extends Component
{
    componentDidMount()
    {
        // this.setState({ text: 'cookie 1' })
        console.log('bacti 2', this.state)
        // console.log(linkState)
        console.log(this.bar)
        this.bar.setState({ text: 'abc'})
        this.linkState('text')('npm')
    }
    componentDidUpdate()
    {
        console.log('bacti 1', this.state.text)
    }
    render({ }, { text }) {
        return <Bar ref={evt => (this.bar = evt)} />;
        // return <Bar />;
    }
}