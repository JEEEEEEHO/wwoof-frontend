const HostOption = ({setHostList}) => {

    return(
        <div>
            <div>
                <form action="/hosts/search">
                    <div>
                        <div>
                            <input type="date" class="form-control" placeholder="시작일" aria-label="Username" aria-describedby="basic-addon1" name="startdate" id="startdate" />
                            <input type="date" class="form-control" placeholder="종료일" aria-label="Username" aria-describedby="basic-addon1" name="enddate" id="enddate" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>인원</div>
                            <select name="people" id="people">
                                <option selected="selected" value="one">1</option>
                                <option value="two">2</option>
                                <option value="three">3</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" onclick="addoption();">조건추가</button>
                    <div class="col-auto">
                        <button type="submit" >검색</button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default HostOption;