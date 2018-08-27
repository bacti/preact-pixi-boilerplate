import { h, render, Component } from 'preact'
import Loader from 'resource-loader'
import { Base, Container, Text, Sprite } from 'preact-pixi'
import JSZip from 'jszip-sync'
import Utils from './Utils'
import Jasmine from 'jasmine'
import { JAnimation, Animation } from 'jasmine/preact-pixi'

export default class ActionPhrase extends Base
{
    constructor()
    {
        super()
        this.state =
        {
            spriteLoaded: false,
            cinematicLoaded: false,
            text: null,
        }

        this.loader = new Loader()
        this.loader
        .add('zip', resource.get_embed_src('data/data.zip'), { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER })
        .load( _ =>
        {
            let zip = new JSZip()
            zip.sync( _ =>
            {
                zip.loadAsync(this.loader.resources['zip'].data).then(zip =>
                {
                    zip.file('sprites.json').async('text').then(data =>
                    {
                        this.sprites = new Jasmine(JSON.parse(data), _ => this.setState({ spriteLoaded: true }))
                    })
                    zip.file('ha_linh_phieu.json').async('text').then(data =>
                    {
                        this.cinematics = new Jasmine(JSON.parse(data), _ => this.setState({ cinematicLoaded: true }))
                    })
                })
            })
            this.setState({ text: 'Cookie' })
        })
    }

    componentReady()
    {
        return this.state.text && this.state.spriteLoaded && this.state.cinematicLoaded
    }

    render()
    {
        return (
            <Container>
                <Sprite texture={PIXI.Texture.fromImage('data/cat.png')}
                    position={[200,200]}
                    anchor={[0.5,0.5]}
                    scale={[2,2]}
                    rotation={0.5}
                    alpha={0.5}
                    blendMode={PIXI.BLEND_MODES.OVERLAY}
                />
                <Text object='text' text={`${this.state.text}! ^o^`} position={[300,100]} style={{ fill: 0x00ff10 }} />
                <Container>
                    <Animation position={[500,400]} jasmine={this.cinematics} index={CINEMATIC_HA_LINH_PHIEU} scale={[0.5]} />
                    <Animation position={[500,200]} jasmine={this.sprites} index={SPRITE_GRANT_ANIM_RUN} />
                    <Animation position={[700,300]} jasmine={this.sprites} index={SPRITE_COIN_ANIM_SPIN} />
                </Container>
            </Container>
        )
    }
}
