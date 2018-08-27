import { h, render, Component } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class BasicFilter extends Base
{
    constructor()
    {
        super()
        this.state = { shader: false }
        PIXI.loader.add('shader', 'https://pixijs.io/examples/required/assets/basics/shader.frag')
        .load((loader, res) => this.setState({ shader: res.shader.data }))
    }

    Update(deltaTime)
    {
        const { ticker } = this.props.root
        this.filter.uniforms.customUniform += 0.04 * deltaTime
    }

    componentReady()
    {
        return this.state.shader
    }

    componentDidMount()
    {
        const { background } = this.objects
        background.filters = [this.filter]
        this.BindUpdate()
    }

    render()
    {
        this.filter = new PIXI.Filter(null, this.state.shader)
        return (
            <Container>
                <Sprite object='background' texture={PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/bkg-grass.jpg')} width={1} height={1} />
            </Container>
        )
    }
}
