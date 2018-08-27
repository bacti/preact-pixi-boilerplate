import { h, render, Component } from 'preact'
import { Base, Container, Text } from 'preact-pixi'

export default class BasicText extends Base
{
    Update(deltaTime)
    {
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        return (
            <Container>
                <Text position={[30,90]} text='Basic text in pixi' />
                <Text position={[30,180]}
                    text='Rich text with a lot of options and across multiple lines'
                    style={{
                        fontFamily: 'Arial',
                        fontSize: 36,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fill: ['#ffffff', '#00ff99'], // gradient
                        stroke: '#4a1850',
                        strokeThickness: 5,
                        dropShadow: true,
                        dropShadowColor: '#000000',
                        dropShadowBlur: 4,
                        dropShadowAngle: Math.PI / 6,
                        dropShadowDistance: 6,
                        wordWrap: true,
                        wordWrapWidth: 440
                    }}
                />
            </Container>
        )
    }
}
