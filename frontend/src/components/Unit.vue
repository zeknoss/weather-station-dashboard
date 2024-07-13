<script>
import { computed, h } from 'vue';

export default {
    props: {
        mode: String,
        tag: {
            type: String,
            default: 'small',
        }
    },
    setup(props) {
        const unit = computed(() => props.mode === 'celsius' ? '℃' : '℉');
        return () => h(props.tag, {innerHTML: unit.value});
    },
}
</script>