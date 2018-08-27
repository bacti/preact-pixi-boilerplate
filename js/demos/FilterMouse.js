import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class FilterMouse extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('background', 'https://pixijs.io/examples/required/assets/bkg-grass.jpg')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { renderer, screen } = this.props.root
        let v2 = this.filter.uniforms.mouse
        let global = renderer.plugins.interaction.mouse.global
        v2[0] = global.x
        v2[1] = global.y
        this.filter.uniforms.mouse = v2
    
        v2 = this.filter.uniforms.resolution
        v2[0] = screen.width
        v2[1] = screen.height
        this.filter.uniforms.resolution = v2
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
        let shaderFrag =
        `
            precision mediump float;
            uniform vec2 mouse;
            uniform vec2 resolution;
            uniform float time;
            
            void main()
            {
                //pixel coords are inverted in framebuffer
                vec2 pixelPos = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
                if (length(mouse - pixelPos) < 25.0)
                {
                    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * 0.7; //yellow circle, alpha=0.7
                }
                else
                {
                    gl_FragColor = vec4( sin(time), mouse.x/resolution.x, mouse.y/resolution.y, 1) * 0.5; // blend with underlying image, alpha=0.5
                }
            }
        `
        this.filter = new PIXI.Filter(null, shaderFrag)

        return (
            <Container>
                <Sprite texture={this.loader.resources['background'].texture} width={1} height={1} />
                <Container filterArea={screen} filters={[this.filter]} />
            </Container>
        )
    }
}
