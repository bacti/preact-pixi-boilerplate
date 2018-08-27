import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class DemoInteractivity extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('background', 'https://pixijs.io/examples/required/assets/button_test_BG.jpg')
        .add('button', 'https://pixijs.io/examples/required/assets/button.png')
        .add('buttonDown', 'https://pixijs.io/examples/required/assets/buttonDown.png')
        .add('buttonOver', 'https://pixijs.io/examples/required/assets/buttonOver.png')
        .load( _ => this.setState({ textures: true }))
    }

    OnButtonDown()
    {
        this.isdown = true
        this.texture = PIXI.loader.resources['buttonDown'].texture
        this.alpha = 1
    }
    
    OnButtonUp()
    {
        this.isdown = false
        this.texture = this.isOver
            ? PIXI.loader.resources['buttonOver'].texture
            : PIXI.loader.resources['button'].texture
    }
    
    OnButtonOver()
    {
        this.isOver = true
        if (this.isdown)
            return
        this.texture = PIXI.loader.resources['buttonOver'].texture
    }
    
    OnButtonOut()
    {
        this.isOver = false
        if (this.isdown)
            return
        this.texture = PIXI.loader.resources['button'].texture
    }

    componentReady()
    {
        return this.state.textures
    }

    render()
    {
        const { screen } = this.props.root
        let buttonPositions =
        [
            175, 75,
            655, 75,
            410, 325,
            150, 465,
            685, 445
        ]
        let buttonScales = [ [1.2], null, null, [0.8], [0.8,1.2], null ]
        let buttonRotations = [ 0, 0, Math.PI/10, 0, Math.PI ]
        return (
            <Container>
                <Sprite texture={PIXI.loader.resources['background'].texture}
                    width={1} height={1}
                />
                {
                    [...Array(5)].map((_, i) =>
                    {
                        return <Sprite texture={PIXI.loader.resources['button'].texture}
                            position={[buttonPositions[i * 2], buttonPositions[i * 2 + 1]]}
                            anchor={[0.5]}
                            scale={buttonScales[i]}
                            rotation={buttonRotations[i]}
                            onPointerDown={this.OnButtonDown}
                            onPointerUp={this.OnButtonUp}
                            onPointerUpOutside={this.OnButtonUp}
                            onPointerOver={this.OnButtonOver}
                            onPointerOut={this.OnButtonOut}
                        />      
                    })
                }
            </Container>
        )
    }
}
