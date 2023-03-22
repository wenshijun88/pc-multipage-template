<template>
    <svg
        :class="svgClass"
        aria-hidden="true"
        v-on="$listeners"
        :style="{width: width, height: height}"
    >
        <use :href="iconName" />
    </svg>
</template>

<script>
    export default {
        name: 'IconSvg',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '16px'
            },
            height: {
                type: String,
                default: '16px'
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            },
            svgClass() {
                if (this.className) {
                    return 'svg-icon ' + this.className
                } else {
                    return 'svg-icon'
                }
            },
            styleExternalIcon() {
                return {
                    mask: `url(${this.iconClass}) no-repeat 50% 50%`,
                    '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
                }
            }
        }
    }
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .svg-external-icon {
        background-color: currentColor;
        mask-size: cover!important;
        display: inline-block;
    }
</style>
