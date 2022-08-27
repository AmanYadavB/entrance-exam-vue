<template>
        <div class="border rounded flex al-center" style="height: 38em;">
            
            <div class="flex jc-cent w-100 h-100 al-cent">
                <div class="m-5 p-5 background-color w-70 h-70 border border-info rounded">
                    <div class="fw-bold fs-1 text-center" >OOps !! <br>Page Not Found</div>
                    <div class="text-center fs-5 m-4">
                        Page returned with status of 404
                    </div>
                    <div class="flex jc-cent m-5 p-5">
                        <div>
                            <b-button variant="info" class="p-2" href="allassesments">
                                Go To Home Page
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>

export default {
    name: 'PageNotFound',
}
</script>
<style>
    .background-danger{
        background-color: rgb(255, 212, 212);
    }
    .font-large{
        font-size: xx-large;
    }
    .al-cent{
        align-items: center;
    }
    .jc-cent {
        justify-content: center;
    }
    .w-70 {
        width: 70%;
    }
    .h-70 {
        height: 70%;
    }
</style>