import { h, render, Component } from 'preact'
import { Base, Container, Sprite, Text } from 'preact-pixi'

export default class BasicContainer extends Base
{
    componentDidMount()
    {
        const { screen } = this.props.root
        this.container.x = (screen.width - this.container.width) / 2
        this.container.y = (screen.height - this.container.height) / 2
    }

    render()
    {
        let texture = PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/basics/bunny.png')
        return (
            <Container>
            {
                [...Array(25)].map((_, i) =>
                {
                    return <Sprite texture={texture}
                        position={[(i % 5) * 40, Math.floor(i / 5) * 40]}
                        anchor={[0.5]}
                    />
                })
            }
            </Container>
        )
    }
}
