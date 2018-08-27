import { h } from 'preact'
import { Base, Container, ParticleContainer, Sprite, Graphics } from 'preact-pixi'

export default class DemoParticleContainer extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('dude', 'https://pixijs.io/examples/required/assets/tinyMaggot.png')
        .load(evt => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        [...Array(this.totalSprites)].map((_, i) =>
        {
            let dude = this.objects['dude' + i]
            let { direction, turningSpeed, speed, offset } = dude.props
            direction += turningSpeed * 0.01
            dude.scale.y = 0.95 + Math.sin(this.tick + offset) * 0.05
            dude.x += Math.sin(direction) * (speed * dude.scale.y)
            dude.y += Math.cos(direction) * (speed * dude.scale.y)
            dude.rotation = -direction + Math.PI
    
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
        this.tick += 0.1
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
        const { screen, renderer } = this.props.root
        let padding = 100
        this.dudeBounds = new PIXI.Rectangle(-padding, -padding, screen.width + padding * 2, screen.height + padding * 2)
        this.totalSprites = renderer instanceof PIXI.WebGLRenderer ? 1000 : 100
        this.tick = 0

        return (
            <Container>
                <ParticleContainer maxSize={10000}
                    properties={{
                        scale: true,
                        position: true,
                        rotation: true,
                        uvs: true,
                        alpha: true
                    }}
                >
                {
                    [...Array(this.totalSprites)].map((_, i) =>
                    {
                        return <Sprite object={'dude'+i} texture={PIXI.loader.resources['dude'].texture}
                            position={[Math.random() * screen.width, Math.random() * screen.height]}
                            anchor={[0.5]}
                            scale={[0.8 + Math.random() * 0.3]}
                            tint={Math.random() * 0xE8D4CD}
                            direction={Math.random() * Math.PI * 2}
                            turningSpeed={Math.random() - 0.8}
                            speed={(2 + Math.random() * 2) * 0.2}
                            offset={Math.random() * 100}
                        />
                    })
                }
                </ParticleContainer>
            </Container>
        )
    }
}
