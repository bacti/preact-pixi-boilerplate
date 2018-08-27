import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class DemoBlendModes extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('bg', 'https://pixijs.io/examples/required/assets/BGrotate.jpg')
        .add('dude', 'https://pixijs.io/examples/required/assets/flowerTop.png')
        .load(evt => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        [...Array(this.totaldudes)].map((_, i) =>
        {
            let dude = this.objects['dude' + i]
            let { direction, turningSpeed, speed } = dude.props
            direction += turningSpeed * 0.01
            dude.x += Math.sin(direction) * speed
            dude.y += Math.cos(direction) * speed
            dude.rotation = -direction - Math.PI / 2
    
            if (dude.x < this.dudeBounds.x)
            {
                dude.x += this.dudeBounds.width
            }
            else
            if (dude.x > this.dudeBounds.x + this.dudeBounds.width)
            {
                dude.x -= this.dudeBounds.width
            }

            if (dude.y < this.dudeBounds.y)
            {
                dude.y += this.dudeBounds.height
            }
            else
            if (dude.y > this.dudeBounds.y + this.dudeBounds.height)
            {
                dude.y -= this.dudeBounds.height
            }
        })
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
        let padding = 100
        this.dudeBounds = new PIXI.Rectangle(-padding,-padding, screen.width + padding * 2, screen.height + padding * 2)
        this.totaldudes = 20

        return (
            <Container>
                <Sprite texture={PIXI.loader.resources['bg'].texture} width={1} height={1} />
                {
                    [...Array(this.totaldudes)].map((_, i) =>
                    {
                        return <Sprite object={'dude'+i} texture={PIXI.loader.resources['dude'].texture}
                            position={[Math.floor(Math.random() * screen.width), Math.floor(Math.random() * screen.height)]}
                            anchor={[0.5]}
                            scale={[0.8 + Math.random() * 0.3]}
                            blendMode={PIXI.BLEND_MODES.ADD}
                            direction={Math.random() * Math.PI * 2}
                            turningSpeed={Math.random() - 0.8}
                            speed={2 + Math.random() * 2}
                        />
                    })
                }
            </Container>
        )
    }
}
