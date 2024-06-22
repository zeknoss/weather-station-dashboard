<?php
file_put_contents('./storage/report.json', json_encode(array_merge($_GET, $_POST)));
