import { h, render, Component } from 'preact'
import { Base, Container, Sprite, RenderTexture } from 'preact-pixi'

export default class BasicRenderTexture extends Base
{
    componentDidMount()
    {
        const { screen } = this.props
    }

    render()
    {
        let texture = PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/basics/bunny.png')
        return (
            <Container>
                <Container object='bunnies' position={[100,60]}>
                {
                    [...Array(25)].map((_, i) =>
                    {
                        return <Sprite texture={texture}
                            position={[(i % 5) * 30, Math.floor(i / 5) * 30]}
                            rotation={Math.random() * (Math.PI * 2)}
                        />
                    })
                }
                </Container>
                <RenderTexture position={[450,60]} source='bunnies' base={[300,300,PIXI.SCALE_MODES.LINEAR,1]} />
            </Container>
        )
    }
}
