import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class DemoMasking extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('bg', 'https://pixijs.io/examples/required/assets/BGrotate.jpg')
        .add('bgFront', 'https://pixijs.io/examples/required/assets/SceneRotate.jpg')
        .add('light2', 'https://pixijs.io/examples/required/assets/LightRotate2.png')
        .add('light1', 'https://pixijs.io/examples/required/assets/LightRotate1.png')
        .add('panda', 'https://pixijs.io/examples/required/assets/panda.png')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { bg, bgFront, light1, light2, panda, thing } = this.objects
        bg.rotation += 0.01
        bgFront.rotation -= 0.01
        light1.rotation += 0.02
        light2.rotation += 0.01
        panda.scale.x = 1 + Math.sin(this.count) * 0.04
        panda.scale.y = 1 + Math.cos(this.count) * 0.04

        this.count += 0.1
        thing.clear()
        thing.beginFill(0x8bc5ff, 0.4)
        thing.moveTo(-120 + Math.sin(this.count) * 20, -100 + Math.cos(this.count) * 20)
        thing.lineTo(120 + Math.cos(this.count) * 20, -100 + Math.sin(this.count) * 20)
        thing.lineTo(120 + Math.sin(this.count) * 20, 100 + Math.cos(this.count) * 20)
        thing.lineTo(-120 + Math.cos(this.count) * 20, 100 + Math.sin(this.count) * 20)
        thing.rotation = this.count * 0.1
    }

    OnClick()
    {
        const { container, thing } = this.objects
        container.mask = container.mask ? null : thing
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        const { container, thing } = this.objects
        thing.lineStyle(0)
        container.mask = thing
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.count = 0
        return (
            <Container>
                <Container onClick={ _ => this.OnClick()}>
                    <Sprite object='bg' texture={PIXI.loader.resources['bg'].texture}
                        position={[screen.width / 2, screen.height / 2]}
                        anchor={[0.5]}
                    />
                    <Container object='container' position={[screen.width / 2, screen.height / 2]}>
                        <Sprite object='bgFront' texture={PIXI.loader.resources['bgFront'].texture} anchor={[0.5]} />
                        <Sprite object='light2' texture={PIXI.loader.resources['light2'].texture} anchor={[0.5]} />
                        <Sprite object='light1' texture={PIXI.loader.resources['light1'].texture} anchor={[0.5]} />
                        <Sprite object='panda' texture={PIXI.loader.resources['panda'].texture} anchor={[0.5]} />
                    </Container>
                    <Graphics object='thing' position={[screen.width / 2, screen.height / 2]} />
                    <Text position={[10, screen.height - 26]}
                        text='Click or tap to turn masking on / off.'
                        style={{
                            fontFamily: 'Arial',
                            fontSize: 12,
                            fontWeight:'bold',
                            fill: 'white',
                        }}
                    />
                </Container>
            </Container>
        )
    }
}
