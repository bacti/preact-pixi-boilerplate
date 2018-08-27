import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class FilterBlur extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('bg', 'https://pixijs.io/examples/required/assets/depth_blur_BG.jpg')
        .add('littleDudes', 'https://pixijs.io/examples/required/assets/depth_blur_dudes.jpg')
        .add('littleRobot', 'https://pixijs.io/examples/required/assets/depth_blur_moby.jpg')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        this.count += 0.005
        this.blurFilter1.blur = 20 * Math.cos(this.count)
        this.blurFilter2.blur = 20 * Math.sin(this.count)
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.blurFilter1 = new PIXI.filters.BlurFilter()
        this.blurFilter2 = new PIXI.filters.BlurFilter()
        this.count = 0

        return (
            <Container>
                <Sprite texture={this.loader.resources['bg'].texture} width={1} height={1} />
                <Sprite texture={this.loader.resources['littleDudes'].texture} position={[screen.width / 2 - 315, 200]} filters={[this.blurFilter1]} />
                <Sprite texture={this.loader.resources['littleRobot'].texture} position={[screen.width / 2 - 200, 100]} filters={[this.blurFilter2]} />
            </Container>
        )
    }
}
