import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class FilterBasic extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('bgFront', 'https://pixijs.io/examples/required/assets/SceneRotate.jpg')
        .add('light2', 'https://pixijs.io/examples/required/assets/LightRotate2.png')
        .add('light1', 'https://pixijs.io/examples/required/assets/LightRotate1.png')
        .add('panda', 'https://pixijs.io/examples/required/assets/panda.png')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { bgFront, light1, light2, panda } = this.objects
        bgFront.rotation -= 0.01
        light1.rotation += 0.02
        light2.rotation += 0.01
        panda.scale.x = 1 + Math.sin(this.count) * 0.04
        panda.scale.y = 1 + Math.cos(this.count) * 0.04

        this.count += 0.1

        let { matrix } = this.filter
        matrix[1] = Math.sin(this.count) * 3
        matrix[2] = Math.cos(this.count)
        matrix[3] = Math.cos(this.count) * 1.5
        matrix[4] = Math.sin(this.count / 3) * 2
        matrix[5] = Math.sin(this.count / 2)
        matrix[6] = Math.sin(this.count / 4)
    }

    OnClick()
    {
        const { stage } = this.objects
        this.enabled = !this.enabled
        stage.filters = this.enabled ? [this.filter] : null
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        const { stage } = this.objects
        stage.filters = [this.filter]
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.count = 0
        this.enabled = true
        this.filter = new PIXI.filters.ColorMatrixFilter()

        return (
            <Container>
                <Container object='stage' onClick={ _ => this.OnClick()}>
                    <Container object='container' position={[screen.width / 2, screen.height / 2]}>
                        <Sprite object='bgFront' texture={PIXI.loader.resources['bgFront'].texture} anchor={[0.5]} />
                        <Sprite object='light2' texture={PIXI.loader.resources['light2'].texture} anchor={[0.5]} />
                        <Sprite object='light1' texture={PIXI.loader.resources['light1'].texture} anchor={[0.5]} />
                        <Sprite object='panda' texture={PIXI.loader.resources['panda'].texture} anchor={[0.5]} />
                    </Container>
                    <Text position={[10, screen.height - 25]}
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
