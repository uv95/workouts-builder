import React from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className="mt-32 w-3/4 flex justify-between">
      <div>
        <p className="text-3xl mb-8 font-bold">Body part</p>
        <div class="form-control w-64">
          <div class="collapse collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Abs
            </div>
            <div class="collapse-content ">
              <label class="label cursor-pointer flex justify-start gap-6 ">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Upper</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Lower</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Obliques</span>
              </label>
            </div>
          </div>

          <div class="collapse collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Arms
            </div>
            <div class="collapse-content">
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Biceps</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Triceps</span>
              </label>
            </div>
          </div>

          <div class="collapse collapse-arrow ">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Back
            </div>
            <div class="collapse-content">
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Upper</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Middle</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Lower</span>
              </label>
            </div>
          </div>

          <div class="collapse collapse-arrow ">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Glute
            </div>
            <div class="collapse-content w-64">
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Maximus</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Medius</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Minimus</span>
              </label>
            </div>
          </div>

          <div class="collapse collapse-arrow ">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Chest
            </div>
            <div class="collapse-content">
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Upper</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Middle</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Lower</span>
              </label>
            </div>
          </div>

          <div class="collapse collapse-arrow ">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Legs
            </div>
            <div class="collapse-content">
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Quadriceps</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Hamstrings</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Calves</span>
              </label>
            </div>
          </div>

          <div class="collapse collapse-arrow ">
            <input type="checkbox" />
            <div class="collapse-title py-0 flex items-center text-2xl">
              Shoulders
            </div>
            <div class="collapse-content ">
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Anterior delts</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Lateral delts</span>
              </label>
              <label class="label cursor-pointer flex justify-start gap-6">
                <input type="checkbox" class="checkbox checkbox-sm" />
                <span class="label-text text-xl">Rear delts</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-3xl mb-8 font-bold">Equipment</p>
        <div class="form-control">
          <label class="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" class="checkbox" />
            <span class="label-text text-2xl">Barbell</span>
          </label>
          <label class="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" class="checkbox" />
            <span class="label-text text-2xl">Dumbbells</span>
          </label>
          <label class="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" class="checkbox" />
            <span class="label-text text-2xl">Weight machines</span>
          </label>
          <label class="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" class="checkbox" />
            <span class="label-text text-2xl">Bench</span>
          </label>
          <label class="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" class="checkbox" />
            <span class="label-text text-2xl">Resistance bands/Cables</span>
          </label>
          <label class="label cursor-pointer flex justify-start gap-6 mb-3">
            <input type="checkbox" class="checkbox" />
            <span class="label-text text-2xl">No equipment</span>
          </label>
        </div>
        <Link
          to="/categories/selected_categories"
          className="btn btn-secondary w-52 mt-24"
        >
          Show exercises
        </Link>
      </div>
    </div>
  );
}

export default Categories;
