import { h, render, Component } from 'preact'
import { Base, Container, Sprite, RenderTexture } from 'preact-pixi'

class CustomRT extends RenderTexture
{
    Update(deltaTime)
    {
        [this.rt, this.renderTexture] = [this.renderTexture, this.rt]
        this.container.texture = this.renderTexture
        super.Update(deltaTime)
    }

    componentDidMount()
    {
        const { screen } = this.props.root
        this.renderTexture = PIXI.RenderTexture.create(screen.width,screen.height)
        super.componentDidMount()
    }
}

export default class DemoRenderTexture extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.numFruits = 8
        this.numItems = 20
        ;[...Array(this.numFruits)].map((_, i) => PIXI.loader.add('fruits'+i, `https://pixijs.io/examples/required/assets/spinObj_0${i+1}.png`))
        PIXI.loader.load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { stuffContainer, outputSprite } = this.objects
        this.count += 0.01
        ;[...Array(this.numItems)].map((_, i) => this.objects['item'+i].rotation += 0.1)
        stuffContainer.rotation -= 0.01
        outputSprite.scale.set(1 + Math.sin(this.count) * 0.2)
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
        this.count = 0
        return (
            <Container>
                <CustomRT object='outputSprite' base={[screen.width,screen.height]} clear={false}
                    position={[400,300]} anchor={[0.5]}
                />
                <Container object='stuffContainer' position={[400,300]}>
                {
                    [...Array(this.numItems)].map((_, i) =>
                    {
                        return <Sprite object={'item'+i} texture={PIXI.loader.resources['fruits' + (i % this.numFruits)].texture}
                            position={[Math.random() * 400 - 200, Math.random() * 400 - 200]}
                            anchor={[0.5]}
                        />
                    })
                }
                </Container>
            </Container>
        )
    }
}
