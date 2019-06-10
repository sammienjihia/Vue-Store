<template>
    <div class="grid-container">
        <div class="grid-x grid-padding-x grid-space">
            <div class="cell small-12 large-8">
                <h4>Trending</h4>
                <carousel-component></carousel-component>
            </div>
            <div class="cell small-12 large-4">
                <h4>Featured</h4>
                <card-component></card-component>
            </div>
        </div>
        <div class="grid-x grid-padding-x grid-space">
            <div class="cell small-12">
                <h4>Most Popular</h4>
                <table-component></table-component>
            </div>
        </div>
    </div>
</template>

<script>
    import CarouselComponent from './Carousel'
    import TableComponent from "./Table";
    import CardComponent from "./Card";
    export default {
        name: "home",
        components: {
            CardComponent,
            TableComponent,
            CarouselComponent }
    }
</script>
